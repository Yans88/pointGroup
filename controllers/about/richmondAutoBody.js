'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API GET ABOUT ALL RICHMOND AUTO BODY DATA
exports.getAboutAllRichmond = async (req, res) => {
  try {
    const aboutRichmond = await client.query(
      `SELECT * FROM about_richmond_auto_body`
    );

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: aboutRichmond.rows,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
    console.log(error);
  }
};

// API GET ABOUT A RICHMOND AUTO BODY DATA BY ID
exports.getAboutSingleRichmond = (req, res) => {
  try {
    client.query(
      `SELECT * FROM about_richmond_auto_body WHERE about_richmond_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [aboutSingleRichmond],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: aboutSingleRichmond,
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

// API SEARCH ABOUT RICHMOND AUTO BODY DATA BY KEYWORDS
exports.searchRichmonds = async (req, res) => {
  const { keyword, location, status, orderBy, order, currentPage, perPage } =
    req.query;

  const totalData = await client.query(
    `SELECT *
    FROM about_richmond_auto_body ${
      keyword || status || location ? 'WHERE' : ''
    } ${
      keyword
        ? "LOWER(richmond_name) LIKE '%" + keyword.toLowerCase() + "%'"
        : ''
    } ${status ? `${keyword ? 'AND ' : ''} status = ${status}` : ''} ${
      location
        ? `${keyword || status ? 'AND ' : ''}` +
          "LOWER(location) LIKE '%" +
          location.toLowerCase() +
          "%'"
        : ''
    }`
  );

  client.query(
    `SELECT *
    FROM about_richmond_auto_body ${
      keyword || status || location ? 'WHERE' : ''
    } ${
      keyword
        ? "LOWER(richmond_name) LIKE '%" + keyword.toLowerCase() + "%'"
        : ''
    } ${status ? `${keyword ? 'AND ' : ''} status = ${status}` : ''} ${
      location
        ? `${keyword || status ? 'AND ' : ''}` +
          "LOWER(location) LIKE '%" +
          location.toLowerCase() +
          "%'"
        : ''
    } ORDER BY ${orderBy || 'richmond_name'} ${order || 'ASC'} LIMIT ${
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

// API POST ABOUT A RICHMOND AUTO BODY DATA
exports.postAboutRichmond = (req, res) => {
  try {
    const { richmond_name, location, description, status } = req.body;

    const created_at = new Date();

    const image = req.file;

    let imagePath;

    if (image) {
      imagePath = filePath(req, 'image', image.filename);
    } else {
      imagePath = null;
    }

    client.query(
      `SELECT * FROM about_richmond_auto_body
      WHERE LOWER(richmond_name) = LOWER($1)`,
      [richmond_name],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'Something error while requesting the data.',
          });
        }

          client.query(
            `INSERT INTO about_richmond_auto_body (richmond_name, location, description, image, created_at, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [
              richmond_name,
              location,
              description,
              imagePath,
              created_at,
              status,
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
                  rows: [aboutRichmond],
                } = result;

                return res.status(200).json({
                  success: true,
                  message: 'Created the data successfully.',
                  data: aboutRichmond,
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

// API PUT / UPDATE ABOUT A RICHMOND AUTO BODY DATA BY ID
exports.updateAboutRichmond = async (req, res) => {
  try {
    const {
      rows: [aboutRichmond],
    } = await client.query(
      `SELECT * FROM about_richmond_auto_body WHERE about_richmond_id = ${req.params.id}`
    );

    if (!aboutRichmond) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        richmond_name: exist_richmond_name,
        location: exist_location,
        description: exist_description,
        status: exist_status,
        image: exist_image,
      } = aboutRichmond;

      const image = req.file;

      let imagePath;
      let prevImage;

      if (exist_image) {
        prevImage = exist_image.slice(sliceImageFile('image'));
      }

      if (image) {
        imagePath = filePath(req, 'image', image.filename);
      } else {
        imagePath = exist_image;
      }

      const { richmond_name, location, description, status } = req.body;

      const updated_at = new Date();

      client.query(
        `SELECT * FROM about_richmond_auto_body
      WHERE LOWER(richmond_name) = LOWER($1)`,
        [richmond_name],
        (error, results) => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              error: 'Something error while requesting the data.',
            });
          }
      
            client.query(
              `UPDATE about_richmond_auto_body SET richmond_name = $1, location = $2, description = $3, image = $4, updated_at = $5, status = $6 WHERE about_richmond_id = $7 RETURNING *`,
              [
                richmond_name || exist_richmond_name,
                location || exist_location,
                description || exist_description,
                imagePath || exist_image,
                updated_at,
                status || exist_status,
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
                    rows: [updatedAboutRichmond],
                  } = result;

                  if (
                    image &&
                    updatedAboutRichmond &&
                    prevImage !== undefined
                  ) {
                    fs.unlink(prevImage, error => {
                      if (error) throw error;
                    });
                  }

                  return res.status(200).json({
                    success: true,
                    message: 'Updated the data successfully.',
                    data: updatedAboutRichmond,
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

// API DELETE ABOUT A RICHMOND AUTO BODY DATA BY ID
exports.deleteAboutRichmond = async (req, res) => {
  try {
    const {
      rows: [aboutRichmond],
    } = await client.query(
      `SELECT * FROM about_richmond_auto_body WHERE about_richmond_id = ${req.params.id}`
    );

    if (!aboutRichmond) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      if (aboutRichmond.image) {
        fs.unlink(aboutRichmond.image.slice(sliceImageFile('image')), error => {
          if (error) throw error;
        });
      }

      client.query(
        `DELETE FROM about_richmond_auto_body WHERE about_richmond_id = ${req.params.id}`,
        error => {
          if (error) {
            console.log(error);
            return res.status(400).json({
              success: false,
              message: 'Error while deleting the data.',
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
