'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');
const helperModule = require('../../helpers/module');
const { valueOf } = require('lodash/chain');
const { formatDate, filePath } = helperModule;

// API GET ALL data Members
exports.getAllDataMembers = async (req, res) => {
  const { keyword, activated } = req.body;
  let per_page =
    parseInt(req.body.per_page) > 0 ? parseInt(req.body.per_page) : 0;
  const page_number =
    parseInt(req.body.page_number) > 0 ? parseInt(req.body.page_number) : 1;
  let status = parseInt(activated) > 0 ? parseInt(activated) : 0;
  const start_date = req.body.start_date ? formatDate(req.body.start_date) : '';
  const end_date = req.body.end_date ? formatDate(req.body.end_date) : '';
  let sort_column = req.body.sort_column
    ? req.body.sort_column
    : ' first_name ';
  const sort_order = req.body.sort_order ? req.body.sort_order : ' ASC ';
  sort_column =
    sort_column === 'member_id' || sort_column === 'activated'
      ? sort_column + '::integer '
      : sort_column;
  let countData = 0;
  let data = '';
  let sql = '';

  try {
    status = activated === 1 ? 1 : 0;
    let sql_cnt = 'SELECT count(*) FROM members WHERE 1=1';
    if (parseInt(activated) > 0)
      sql_cnt += ` and active = (CAST(${status} AS bit))`;
    if (start_date) sql_cnt += ` and change_date::date >= '${start_date}'`;
    if (end_date) sql_cnt += ` and change_date::date <= '${end_date}'`;

    if (keyword || keyword !== '') {
      sql_cnt +=
        " and (lower(first_name) like '%" +
        keyword.toLowerCase() +
        "%' or lower(middle_name) like '%" +
        keyword.toLowerCase() +
        "%' or lower(last_name) like '%" +
        keyword.toLowerCase() +
        "%' or cell_phone like '%" +
        keyword +
        "%' or member_id::text like '%" +
        keyword +
        "%' or lower(concat(first_name,CASE WHEN (members.middle_name IS NOT NULL) THEN concat(' ', members.middle_name) ELSE ''::text END,' ',last_name)) like '%" +
        keyword.toLowerCase() +
        "%' or lower(email) like '%" +
        keyword.toLowerCase() +
        "%')";
    }

    const {
      rows: [cnt],
    } = await client.query(sql_cnt);
    countData = parseInt(cnt.count);
    if (countData > 0) {
      if (keyword || keyword !== '') {
        per_page = per_page > 0 ? per_page : parseInt(cnt.count);
        let offset = (page_number - 1) * per_page;

        sql =
          'SELECT member_id,first_name,middle_name,last_name, home_phone,cell_phone,work_phone,fax_phone,email,active, created_date, change_date FROM members where 1=1';
        if (parseInt(activated) > 0)
          sql += ` and active = (CAST(${status} AS bit))`;
        if (start_date) sql += ` and change_date::date >= '${start_date}'`;
        if (end_date) sql += ` and change_date::date <= '${end_date}'`;
        sql +=
          " and (lower(first_name) like '%" +
          keyword.toLowerCase() +
          "%' or lower(middle_name) like '%" +
          keyword.toLowerCase() +
          "%' or lower(last_name) like '%" +
          keyword.toLowerCase() +
          "%' or cell_phone like '%" +
          keyword +
          "%' or member_id::text like '%" +
          keyword +
          "%' or lower(concat(first_name,CASE WHEN (members.middle_name IS NOT NULL) THEN concat(' ', members.middle_name) ELSE ''::text END,' ',last_name)) like '%" +
          keyword.toLowerCase() +
          "%' or lower(email) like '%" +
          keyword.toLowerCase() +
          "%')";

        sql +=
          ' ORDER BY ' +
          sort_column +
          ' ' +
          sort_order +
          ' LIMIT ' +
          per_page +
          ' OFFSET ' +
          offset;

        data = await client.query(sql);
        //countData = parseInt(data.rowCount);
      } else {
        per_page = per_page > 0 ? per_page : parseInt(cnt.count);
        let offset = (page_number - 1) * per_page;
        sql =
          'SELECT member_id,first_name,middle_name,last_name, home_phone,cell_phone,work_phone,fax_phone,email,active, created_date, change_date FROM members where 1=1';
        if (parseInt(activated) > 0)
          sql += ` and active = (CAST(${status} AS bit))`;
        if (start_date) sql += ` and change_date::date >= '${start_date}'`;
        if (end_date) sql += ` and change_date::date <= '${end_date}'`;
        sql +=
          ' ORDER BY ' +
          sort_column +
          ' ' +
          sort_order +
          ' LIMIT ' +
          per_page +
          ' OFFSET ' +
          offset;

        data = await client.query(sql);
      }

      data = data.rows;
    }

    let resp = {
      success: true,
      message: 'successfully',
      total_data: countData,
      data: data,
    };
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'data not found',
    });
  }
};

// EDIT DATA MEMBER
exports.editDataMember = async (req, res) => {
  const image = req.file;
  const date = new Date().toISOString().split('T')[0];

  const { first_name, last_name, member_id, activated, user_id } =
    req.body;
  let messages = [];
  if (!first_name || first_name === '')
    messages = [...messages, 'first_name required'];
  if (!member_id || member_id <= 0)
    messages = [...messages, 'member_id required'];
  if (!user_id || user_id <= 0) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages,
    });
  }
  const middle_name = req.body.middle_name && req.body.middle_name !== '' ? req.body.middle_name :  null;
  try {
    let imagePath;
    let sql_update_member = `UPDATE members SET first_name='${first_name}',middle_name=null,last_name='${last_name}',change_date='${date}',change_by='${user_id}' `;
    if(middle_name)  sql_update_member = `UPDATE members SET first_name='${first_name}',middle_name='${middle_name}',last_name='${last_name}',change_date='${date}',change_by='${user_id}' `;
    if (image) {
      imagePath = filePath(req, 'profile_picture', image.filename);
      sql_update_member += `,profile_picture='${imagePath}' `;
    }

    const {
      rows: [member],
    } = await client.query(
      `SELECT * FROM members WHERE member_id = ${member_id}`
    );
    const { active, activation_date } = member;
    if (active !== activated) {
      sql_update_member += `,active=(CAST(${activated} AS bit)),admin_action_date='${date}' `;
    }
    sql_update_member += ` WHERE member_id = ${member_id}`;

    client.query(sql_update_member, (err, result) => {
      if (err) {
        let resp = {
          success: false,
          message: 'errors',
          data: err,
        };
        return res.status(500).json(resp);
      }
    });
    let resp = {
      success: true,
      message: 'successfully',
      data: req.body,
    };
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: 'Something error on server.' });
  }
};
