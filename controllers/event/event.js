'use strict';

// IMPORT ALL PACKAGES
const fs = require('fs');
const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { filePath, sliceImageFile } = helperModule;

// API SEARCH EVENTS DATA BY KEYWORDS, TITLE, STATUS AND BY ID
exports.searchEvents = async (req, res) => {
  const { id, keyword, status, orderBy, order, currentPage, perPage } =
    req.query;

  const sql = `SELECT *
    FROM events ${id || keyword || status ? 'WHERE' : ''} ${
    id ? `id = ${id}` : ''
  } ${keyword ? `LOWER(title) LIKE '%${keyword.toLowerCase()}%'` : ''} ${
    status ? `${keyword ? 'AND' : ''} status = ${status}` : ''
  }`;

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

// API POST EVENT
exports.postEvent = (req, res) => {
  try {
    const { title, short_description, status, link } = req.body;

    const created_at = new Date();

    const image = req.file;

    let imagePath;

    if (image) {
      imagePath = filePath(req, 'event_image', image.filename);
    } else {
      imagePath = null;
    }

    client.query(
      `INSERT INTO events (title, event_image, short_description, status, created_at, link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title, imagePath, short_description, status, created_at, link],
      (error, result) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'The data was not created.',
          });
        } else {
          const {
            rows: [event],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: event,
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

// API PUT / UPDATE EVENT DATA BY ID
exports.updateEvent = async (req, res) => {
  try {
    const {
      rows: [event],
    } = await client.query(`SELECT * FROM events WHERE id = ${req.params.id}`);

    if (!event) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        title: exist_title,
        event_image: exist_event_image,
        short_description: exist_short_description,
        status: exist_status,
        link: exist_link,
      } = event;

      const image = req.file;

      let imagePath;
      let prevImage;

      if (exist_event_image) {
        prevImage = exist_event_image.slice(sliceImageFile('event_image'));
      }

      if (image) {
        imagePath = filePath(req, 'event_image', image.filename);
      } else {
        imagePath = exist_event_image;
      }

      const { title, short_description, status, link } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE events SET title = $1, event_image = $2, short_description = $3, status = $4, updated_at = $5, link= $6 WHERE id = $7 RETURNING *`,
        [
          title || exist_title,
          imagePath || exist_event_image,
          short_description || exist_short_description,
          status || exist_status,
          updated_at,
          link || exist_link,
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
              rows: [updatedEvent],
            } = result;

            if (image && updatedEvent && prevImage !== undefined) {
              fs.unlink(prevImage, error => {
                if (error) throw error;
              });
            }

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedEvent,
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

// API DELETE EVENT DATA BY ID
exports.deleteEvent = async (req, res) => {
  try {
    const {
      rows: [event],
    } = await client.query(`SELECT * FROM events WHERE id = ${req.params.id}`);

    if (!event) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      if (event.event_image) {
        fs.unlink(
          event.event_image.slice(sliceImageFile('event_image')),
          err => {
            if (err) throw err;
          }
        );
      }

      client.query(`DELETE FROM events WHERE id = ${req.params.id}`, error => {
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
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
