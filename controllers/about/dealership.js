'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API GET ABOUT ALL DEALERSHIPS DATA
exports.getAboutAllDealerships = async (req, res) => {
  try {
    const aboutDealership = await client.query(
      `SELECT * FROM about_dealerships`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: aboutDealership.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET ABOUT A DEALERSHIP DATA BY ID
exports.getAboutSingleDealership = (req, res) => {
  try {
    client.query(
      `SELECT * FROM about_dealerships WHERE about_dealership_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [aboutDealership],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: aboutDealership,
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

// API SEARCH ABOUT DEALERSHIP DATA BY KEYWORDS
exports.searchDealerships = async (req, res) => {
  const { keyword, location, status, orderBy, order, currentPage, perPage } =
    req.query;

  const sql = `SELECT *
    FROM about_dealerships ${keyword || status || location ? 'WHERE' : ''} ${
    keyword
      ? `(LOWER(dealer_name) LIKE '%${keyword.toLowerCase()}%' OR LOWER(location) LIKE '%${keyword.toLowerCase()}%')`
      : ''
  } ${status ? `${keyword ? 'AND' : ''} status = ${status}` : ''} ${
    location
      ? `${
          keyword || status ? 'AND' : ''
        } LOWER(location) LIKE '%${location.toLowerCase()}%'`
      : ''
  }`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'dealer_name'} ${order || 'ASC'} LIMIT ${
      +perPage || 10
    } OFFSET ${((+currentPage || 1) - 1) * (perPage || 10)}`,
    (error, result) => {
      if (result.rows.length === 0) {
        console.log(error);
        return res.status(400).json({
          success: false,
          error: 'There is no data found.',
        });
      } else {
        return res.status(200).json({
          success: true,
          message: 'Data was found with this keyword and filters.',
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

// API POST ABOUT A DEALERSHIP DATA
exports.postAboutDealership = (req, res) => {
  try {
    const {
      dealer_name,
      partner_pk,
      location,
      location_pk,
      description,
      status,
      tag,
    } = req.body;

    const created_at = new Date();

    const image = req.file;

    let imagePath;

    if (image) {
      imagePath = filePath(req, 'dealer_image', image.filename);
    } else {
      imagePath = null;
    }

    client.query(
      `SELECT * FROM about_dealerships
      WHERE LOWER(dealer_name) = LOWER($1)`,
      [dealer_name],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'Something error while requesting the data.',
          });
        }

        client.query(
          `INSERT INTO about_dealerships (dealer_name, partner_pk, location, location_pk, description, dealer_image, created_at, status, tag) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
          [
            dealer_name,
            partner_pk,
            location,
            location_pk,
            description,
            imagePath,
            created_at,
            status,
            tag,
          ],
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(400).json({
                success: false,
                error: 'The data was not created.',
              });
            } else {
              const {
                rows: [aboutDealership],
              } = result;

              return res.status(200).json({
                success: true,
                message: 'Created the data successfully.',
                data: aboutDealership,
              });
            }
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};

// API PUT / UPDATE ABOUT A DEALERSHIP DATA BY ID
exports.updateAboutDealership = async (req, res) => {
  try {
    const {
      rows: [aboutDealership],
    } = await client.query(
      `SELECT * FROM about_dealerships WHERE about_dealership_id = ${req.params.id}`
    );

    if (!aboutDealership) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        dealer_name: exist_dealer_name,
        partner_pk: exist_partner_pk,
        location: exist_location,
        location_pk: exist_location_pk,
        description: exist_description,
        status: exist_status,
        tag: exist_tag,
        dealer_image: exist_dealer_image,
      } = aboutDealership;

      const image = req.file;

      let imagePath;
      let prevImage;

      if (exist_dealer_image) {
        prevImage = exist_dealer_image.slice(sliceImageFile('dealer_image'));
      }

      if (image) {
        imagePath = filePath(req, 'dealer_image', image.filename);
      } else {
        imagePath = exist_dealer_image;
      }

      const {
        dealer_name,
        partner_pk,
        location,
        location_pk,
        description,
        status,
        tag,
      } = req.body;

      const updated_at = new Date();

      client.query(
        `SELECT * FROM about_dealerships
      WHERE LOWER(dealer_name) = LOWER($1)`,
        [dealer_name],
        error => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Something error while requesting the data.',
            });
          }

          client.query(
            `UPDATE about_dealerships SET dealer_name = $1, partner_pk = $2, location = $3, location_pk = $4, description = $5, dealer_image = $6, updated_at = $7, status = $8, tag= $9 WHERE about_dealership_id = $10 RETURNING *`,
            [
              dealer_name || exist_dealer_name,
              partner_pk || exist_partner_pk,
              location || exist_location,
              location_pk || exist_location_pk,
              description || exist_description,
              imagePath || exist_dealer_image,
              updated_at,
              status || exist_status,
              tag || exist_tag,
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
                  rows: [updatedAboutDealership],
                } = result;

                if (
                  image &&
                  updatedAboutDealership &&
                  prevImage !== undefined
                ) {
                  fs.unlink(prevImage, error => {
                    if (error) throw error;
                  });
                }

                return res.status(200).json({
                  success: true,
                  message: 'Updated the data successfully.',
                  data: updatedAboutDealership,
                });
              }
            }
          );
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

// API DELETE ABOUT A DEALERSHIP DATA BY ID
exports.deleteAboutDealership = async (req, res) => {
  try {
    const {
      rows: [aboutDealership],
    } = await client.query(
      `SELECT * FROM about_dealerships WHERE about_dealership_id = ${req.params.id}`
    );

    if (!aboutDealership) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      if (aboutDealership.dealer_image) {
        fs.unlink(
          aboutDealership.dealer_image.slice(sliceImageFile('dealer_image')),
          err => {
            if (err) throw err;
          }
        );
      }

      client.query(
        `DELETE FROM about_dealerships WHERE about_dealership_id = ${req.params.id}`,
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
