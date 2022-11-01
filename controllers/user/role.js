'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');

// API GET ALL ROLES DATA
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await client.query(`SELECT * FROM roles`);

    return res.status(200).json({
      success: true,
      message: 'Got all data successfully.',
      data: roles.rows,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'There is no data found.' });
  }
};

// API GET A ROLE DATA BY ID
exports.getSingleRole = (req, res) => {
  try {
    client.query(
      `SELECT * FROM roles WHERE role_id = ${req.params.id}`,
      (error, result) => {
        if (result.rows.length === 0) {
          console.log(error);
          return res.status(400).json({
            success: false,
            error: 'There is no data found with this Id.',
          });
        } else {
          const {
            rows: [role],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Got the data successfully.',
            data: role,
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

// API SEARCH ROLES DATA BY KEYWORDS
exports.searchRoles = async (req, res) => {
  const { keyword, status, orderBy, order, currentPage, perPage } = req.query;

  const sql = `SELECT * FROM roles ${keyword || status ? 'WHERE' : ''} ${
    keyword ? `LOWER(role_name) LIKE '%${keyword.toLowerCase()}%'` : ''
  } ${status ? `${keyword ? 'AND' : ''} status = ${status}` : ''}`;

  const totalData = await client.query(sql);

  client.query(
    `${sql} ORDER BY ${orderBy || 'role_name'} ${order || 'ASC'} LIMIT ${
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

// API POST A ROLE DATA
exports.postRole = (req, res) => {
  try {
    const {
      role_name,
      status,
      d1,
      d2,
      d3,
      ba1,
      ba2,
      ba3,
      ba4,
      ba5,
      ba6,
      ba7,
      ba8,
      ba9,
      ba10,
      ba11,
      ba12,
      ba13,
      ba14,
      ba15,
      ba16,
      ba17,
      ba18,
      ba19,
      ba20,
      ba21,
      ba22,
      m1,
      m2,
      m3,
      m4,
      m5,
      m6,
      m7,
      m8,
      hcn1,
      hcn2,
      hcn3,
      hcn4,
      hcn5,
      hcn6,
      hcn7,
      hcn8,
      hcn9,
      hcn10,
      hcn11,
      hcn12,
      hcn13,
      hcn14,
      hcn15,
      hcn16,
      hcn17,
      um1,
      um2,
      um3,
      um4,
      um5,
      um6,
      um7,
      ro1,
      ro2,
      ro3,
      ro4,
      ro5,
      p1,
      p2,
      p3,
      p4,
      p5,
      p6,
      p7,
      p8,
      p9,
      p10,
      p11,
      p12,
      p13,
      p14,
    } = req.body;

    const created_at = new Date();

    client.query(
      `INSERT INTO roles (role_name, status, d1, d2, d3, ba1, ba2, ba3, ba4, ba5, ba6, ba7, ba8, ba9, ba10, ba11, ba12, ba13, ba14, ba15, ba16, ba17, ba18, ba19, ba20, ba21, ba22, m1, m2, m3, m4, m5, m6, m7, m8, hcn1, hcn2, hcn3, hcn4, hcn5, hcn6, hcn7, hcn8, hcn9, hcn10, hcn11, hcn12, hcn12, hcn13, hcn14, hcn15, hcn16, hcn17, um1, um2, um3, um4, um5, um6, um7, ro1, ro2, ro3, ro4, ro5, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79) RETURNING *`,
      [
        role_name,
        status,
        d1,
        d2,
        d3,
        ba1,
        ba2,
        ba3,
        ba4,
        ba5,
        ba6,
        ba7,
        ba8,
        ba9,
        ba10,
        ba11,
        ba12,
        ba13,
        ba14,
        ba15,
        ba16,
        ba17,
        ba18,
        ba19,
        ba20,
        ba21,
        ba22,
        m1,
        m2,
        m3,
        m4,
        m5,
        m6,
        m7,
        m8,
        hcn1,
        hcn2,
        hcn3,
        hcn4,
        hcn5,
        hcn6,
        hcn7,
        hcn8,
        hcn9,
        hcn10,
        hcn11,
        hcn12,
        hcn13,
        hcn14,
        hcn15,
        hcn16,
        hcn17,
        um1,
        um2,
        um3,
        um4,
        um5,
        um6,
        um7,
        ro1,
        ro2,
        ro3,
        ro4,
        ro5,
        p1,
        p2,
        p3,
        p4,
        p5,
        p6,
        p7,
        p8,
        p9,
        p10,
        p11,
        p12,
        p13,
        p14,
        created_at,
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
            rows: [role],
          } = result;

          return res.status(200).json({
            success: true,
            message: 'Created the data successfully.',
            data: role,
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

// API PUT / UPDATE A ROLE DATA BY ID
exports.updateRole = async (req, res) => {
  try {
    const {
      rows: [role],
    } = await client.query(
      `SELECT * FROM roles WHERE role_id = ${req.params.id}`
    );

    if (!role) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      const {
        role_name,
        status,
        d1,
        d2,
        d3,
        ba1,
        ba2,
        ba3,
        ba4,
        ba5,
        ba6,
        ba7,
        ba8,
        ba9,
        ba10,
        ba11,
        ba12,
        ba13,
        ba14,
        ba15,
        ba16,
        ba17,
        ba18,
        ba19,
        ba20,
        ba21,
        ba22,
        m1,
        m2,
        m3,
        m4,
        m5,
        m6,
        m7,
        m8,
        hcn1,
        hcn2,
        hcn3,
        hcn4,
        hcn5,
        hcn6,
        hcn7,
        hcn8,
        hcn9,
        hcn10,
        hcn11,
        hcn12,
        hcn13,
        hcn14,
        hcn15,
        hcn16,
        hcn17,
        um1,
        um2,
        um3,
        um4,
        um5,
        um6,
        um7,
        ro1,
        ro2,
        ro3,
        ro4,
        ro5,
        p1,
        p2,
        p3,
        p4,
        p5,
        p6,
        p7,
        p8,
        p9,
        p10,
        p11,
        p12,
        p13,
        p14,
      } = req.body;

      const updated_at = new Date();

      client.query(
        `UPDATE roles SET role_name = $1, status = $2, d1 = $3, d2 = $4, d3 = $5, ba1 = $6, ba2 = $7, ba3 = $8, ba4 = $9, ba5 = $10, ba6 = $11, ba7 = $12, ba8 = $13, ba9 = $14, ba10 = $15, ba11 = $16, ba12 = $17, ba13 = $18, ba14 = $19, ba15 = $20, ba16 = $21, ba17 = $22, ba18 = $23, ba19 = $24, ba20 = $25, ba21 = $26, ba22 = $27, m1 = $28, m2 = $29, m3 = $30, m4 = $31, m5 = $32, m6 = $33, m7 = $34, m8 = $35, hcn1 = $36, hcn2 = $37, hcn3 = $38, hcn4 = $39, hcn5 = $40, hcn6 = $41, hcn7 = $42, hcn8 = $43, hcn9 = $44, hcn10 = $45, hcn11 = $46, hcn12 = $47, hcn13 = $48, hcn14 = $49, hcn15 = $50, hcn16 = $51, hcn17 = $52, um1 = $53, um2 = $54, um3 = $55, um4 = $56, um5 = $57, um6 = $58, um7 = $59, ro1 = $60, ro2 = $61, ro3 = $62, ro4 = $63, ro5 = $64, p1 = $65, p2 = $66, p3 = $67, p4 = $68, p5 = $69, p6 = $70, p7 = $71, p8 = $72, p9 = $73, p10 = $74, p11 = $75, p12 = $76, p13 = $77, p14 = $78, updated_at = $79 WHERE role_id = $80 RETURNING *`,
        [
          role_name,
          status,
          d1,
          d2,
          d3,
          ba1,
          ba2,
          ba3,
          ba4,
          ba5,
          ba6,
          ba7,
          ba8,
          ba9,
          ba10,
          ba11,
          ba12,
          ba13,
          ba14,
          ba15,
          ba16,
          ba17,
          ba18,
          ba19,
          ba20,
          ba21,
          ba22,
          m1,
          m2,
          m3,
          m4,
          m5,
          m6,
          m7,
          m8,
          hcn1,
          hcn2,
          hcn3,
          hcn4,
          hcn5,
          hcn6,
          hcn7,
          hcn8,
          hcn9,
          hcn10,
          hcn11,
          hcn12,
          hcn13,
          hcn14,
          hcn15,
          hcn16,
          hcn17,
          um1,
          um2,
          um3,
          um4,
          um5,
          um6,
          um7,
          ro1,
          ro2,
          ro3,
          ro4,
          ro5,
          p1,
          p2,
          p3,
          p4,
          p5,
          p6,
          p7,
          p8,
          p9,
          p10,
          p11,
          p12,
          p13,
          p14,
          updated_at,
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
              rows: [updatedRole],
            } = result;

            return res.status(200).json({
              success: true,
              message: 'Updated the data successfully.',
              data: updatedRole,
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

// API DELETE A ROLE DATA BY ID
exports.deleteRole = async (req, res) => {
  try {
    const {
      rows: [role],
    } = await client.query(
      `SELECT * FROM roles WHERE role_id = ${req.params.id}`
    );

    if (!role) {
      return res.status(400).json({
        success: false,
        error: 'There is no data found with this Id.',
      });
    } else {
      client.query(
        `DELETE FROM roles WHERE role_id = ${req.params.id}`,
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
