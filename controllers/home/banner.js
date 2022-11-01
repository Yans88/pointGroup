'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API GET HOME ALL BANNERS DATA
exports.getAllBanners = async (req, res) => {
  try {
    const homeBanner = await client.query(
      `SELECT * FROM home_banners ORDER BY position ASC`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: homeBanner.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET HOME ALL ACTIVE BANNERS DATA
exports.getAllActiveBanners = async (req, res) => {
  try {
    const homeBanner = await client.query(
      `SELECT * FROM home_banners WHERE status=true ORDER BY position ASC`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: homeBanner.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET HOME A BANNER DATA BY ID
exports.getSingleBanner = (req, res) => {
  try {
    client.query(
      `SELECT * FROM home_banners WHERE home_banner_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data with this Id.',
          });
        } else {
          const {
            rows: [homeBanner],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: homeBanner,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API SEARCH HOME A BANNER DATA BY KEYWORDS
exports.searchBanners = async (req, res) => {
  const { keyword, status, orderBy, order, currentPage, perPage } = req.query;

  const sql = `SELECT *
    FROM home_banners ${keyword || status ? 'WHERE' : ''} ${
    keyword
      ? `(LOWER(title) LIKE '%${keyword.toLowerCase()}%' OR for_page = '${keyword}')`
      : ''
  } ${status ? `${keyword ? 'AND' : ''} status = ${status}` : ''}`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'title'} ${order || 'ASC'} LIMIT ${
      +perPage || 10
    } OFFSET ${((+currentPage || 1) - 1) * (perPage || 10)}`,
    (error, result) => {
      if (result.rows.length === 0) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: 'There is no data found with this keyword.',
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Data was found with this keyword.',
          totalData: totalData.rowCount,
          resultData: result.rowCount,
          perPage: perPage,
          currentPage: currentPage,
          data: result.rows,
        });
      }
    }
  );
};

// API POST HOME BANNERS DATA
exports.postHomeBanners = async (req, res) => {
  try {
    const { title, link, for_page } = req.body;

    const created_at = new Date();
    const updated_at = new Date();

    const image = req.file;

    let imagePath;

    if (image) {
      imagePath = filePath(req, 'banner_image', image.filename);
    } else {
      imagePath = null;
    }

    const {
      rows: [replacedHomeBannerForPage],
    } = await client.query(
      `SELECT * FROM home_banners WHERE for_page = '${for_page}'`
    );

    const {
      rows: [replacedHomeBannerLink],
    } = await client.query(`SELECT * FROM home_banners WHERE link = '${link}'`);

    let newLink;
    if (link) newLink = link;
    if (!link) newLink = '';

    client.query(
      `INSERT INTO home_banners (title, link, created_at, banner_image, status, for_page) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, newLink, created_at, imagePath, false, for_page],
      (error, result) => {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ success: false, error: 'The data was not created.' });
        } else {
          const {
            rows: [homeBanner],
          } = result;

          if (replacedHomeBannerForPage) {
            client.query(
              `UPDATE home_banners SET for_page = $1, updated_at = $2 WHERE home_banner_id = $3 RETURNING *`,
              ['no-page', updated_at, replacedHomeBannerForPage.home_banner_id],
              (error, result) => {
                if (error) {
                  console.log(error);
                  return res.status(400).json({
                    success: false,
                    error: 'Error while replacing the data.',
                  });
                }
              }
            );
          }

          if (replacedHomeBannerLink) {
            client.query(
              `UPDATE home_banners SET link = $1, updated_at = $2 WHERE home_banner_id = $3 RETURNING *`,
              ['', updated_at, replacedHomeBannerLink.home_banner_id],
              (error, result) => {
                if (error) {
                  console.log(error);
                  return res.status(400).json({
                    success: false,
                    error: 'Error while replacing the data.',
                  });
                }
              }
            );
          }

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: homeBanner,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API PUT / UPDATE STATUS HOME BANNER DATA
exports.updateBannerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const activeHomeBanners = await client.query(
      `SELECT * FROM home_banners WHERE status = true`
    );

    const {
      rows: [singleHomeBanner],
    } = await client.query(
      `SELECT * FROM home_banners WHERE home_banner_id = ${+req.params.id}`
    );

    if (activeHomeBanners.rowCount === 5 && status === true) {
      return res.status(400).json({
        Succes: false,
        error:
          'Only 5 active banners are allowed. Please inactivate a banner to activate the new one.',
      });
    }

    const updated_at = new Date();

    client.query(
      `UPDATE home_banners SET status = $1, updated_at = $2, position = $3 WHERE home_banner_id = $4 RETURNING *`,
      [
        status,
        updated_at,
        status === true ? activeHomeBanners.rowCount + 1 : null,
        +req.params.id,
      ],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            success: false,
            error: 'Error while updating the data.',
          });
        } else {
          if (status === false) {
            for (let i = 0; i < activeHomeBanners.rowCount; i++) {
              if (activeHomeBanners.rows[i].home_banner_id !== +req.params.id) {
                client.query(
                  `UPDATE home_banners SET position = $1 WHERE home_banner_id = $2 RETURNING *`,
                  [
                    activeHomeBanners.rows[i].position >
                    singleHomeBanner.position
                      ? activeHomeBanners.rows[i].position - 1
                      : activeHomeBanners.rows[i].position,
                    activeHomeBanners.rows[i].home_banner_id,
                  ]
                );
              }
            }
          }

          const {
            rows: [UpdatingHomeBanner],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Updated the data successfully.',
            data: UpdatingHomeBanner,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API PUT / UPDATE POSITION HOME BANNER DATA
exports.updateBannerPosition = async (req, res) => {
  try {
    const { newPosition } = req.body;

    const activeHomeBanners = [];

    for (let i = 0; i < newPosition.length; i++) {
      const {
        rows: [homeBanner],
      } = await client.query(
        `SELECT * FROM home_banners WHERE home_banner_id = ${newPosition[i]}`
      );

      activeHomeBanners.push(homeBanner);
    }

    for (let i = 0; i < activeHomeBanners.length; i++) {
      client.query(
        `UPDATE home_banners SET position = $1 WHERE home_banner_id = $2 RETURNING *`,
        [i + 1, activeHomeBanners[i].home_banner_id],
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Error while updating the data.',
            });
          }
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Updated the data successfully.',
      data: activeHomeBanners,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API PUT / UPDATE HOME BANNERS DATA
exports.updateHomeBanners = async (req, res) => {
  try {
    const {
      rows: [homeBanner],
    } = await client.query(
      `SELECT * FROM home_banners WHERE home_banner_id = ${req.params.id}`
    );

    if (!homeBanner) {
      return res.status(400).json({
        Succes: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        title: exist_title,
        link: exist_link,
        banner_image: exist_banner_image,
        for_page: exist_for_page,
      } = homeBanner;

      const image = req.file;

      let imagePath;
      let prevImage;

      if (exist_banner_image) {
        prevImage = exist_banner_image.slice(sliceImageFile('banner_image'));
      }

      if (image) {
        imagePath = filePath(req, 'banner_image', image.filename);
      } else {
        imagePath = exist_banner_image;
      }

      const { title, link, for_page } = req.body;

      const updated_at = new Date();

      const {
        rows: [replacedHomeBannerForPage],
      } = await client.query(
        `SELECT * FROM home_banners WHERE for_page = '${for_page}'`
      );

      const {
        rows: [replacedHomeBannerLink],
      } = await client.query(
        `SELECT * FROM home_banners WHERE link = '${link}'`
      );

      let newLink;
      if (link) newLink = link;
      if (!link && exist_link) newLink = '';
      if (!link && !exist_link) newLink = '';

      client.query(
        `UPDATE home_banners SET title = $1, link = $2, updated_at = $3, banner_image = $4, for_page = $5 WHERE home_banner_id = $6 RETURNING *`,
        [
          title || exist_title,
          newLink,
          updated_at,
          imagePath,
          for_page || exist_for_page,
          req.params.id,
        ],
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Error while updating the data.',
            });
          } else {
            const {
              rows: [UpdatingHomeBanner],
            } = result;

            if (image && UpdatingHomeBanner && prevImage !== undefined) {
              fs.unlink(prevImage, error => {
                if (error) throw error;
              });
            }

            if (replacedHomeBannerForPage) {
              client.query(
                `UPDATE home_banners SET for_page = $1, updated_at = $2 WHERE home_banner_id = $3 RETURNING *`,
                [
                  'no-page',
                  updated_at,
                  replacedHomeBannerForPage.home_banner_id,
                ],
                (error, result) => {
                  if (error) {
                    console.log(error);
                    return res.status(400).json({
                      success: false,
                      error: 'Error while replacing the data.',
                    });
                  }
                }
              );
            }

            if (replacedHomeBannerLink) {
              client.query(
                `UPDATE home_banners SET link = $1, updated_at = $2 WHERE home_banner_id = $3 RETURNING *`,
                ['', updated_at, replacedHomeBannerLink.home_banner_id],
                (error, result) => {
                  if (error) {
                    console.log(error);
                    return res.status(400).json({
                      success: false,
                      error: 'Error while replacing the data.',
                    });
                  }
                }
              );
            }

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: UpdatingHomeBanner,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API DELETE HOME A BANNER BY ID AND BANNER PATH
exports.deleteSingleBanner = async (req, res) => {
  try {
    const {
      rows: [homeBanner],
    } = await client.query(
      `SELECT * FROM home_banners WHERE home_banner_id = ${req.params.id}`
    );

    if (!homeBanner) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      if (homeBanner.banner_image) {
        fs.unlink(
          homeBanner.banner_image.slice(sliceImageFile('banner_image')),
          error => {
            if (error)
              return res.status(400).json({
                success: false,
                error: 'Error while deleting the data.',
              });
          }
        );
      }

      client.query(
        `DELETE FROM home_banners WHERE home_banner_id = ${req.params.id}`,
        error => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Error while deleting the data.',
            });
          } else {
            return res.status(200).json({
              success: true,
              message: 'Deleted the data successfully.',
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
