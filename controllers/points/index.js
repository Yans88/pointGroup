'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');
const helperModule = require('../../helpers/module');

const templateEmail = require('../../helpers/sendEmail');

const {
  sendEmailRedemptionNotification,
  sendEmailRedemptionVerification,
  sendEmailTransferVerification,
  sendEmailTransferNotificationSource,
  sendEmailTransferNotificationDestination,
  sendAddPointNotification,
  sendEmailAddPointVerification
} = templateEmail;
const { formatDate, transporter } = helperModule;
const jwt = require('jsonwebtoken');
require('dotenv').config();

// API GET ALL data History Point
exports.getAllHistoryPoint = async (req, res) => {
  const { keyword, type, member_id } = req.body;
  let per_page =
    parseInt(req.body.per_page) > 0 ? parseInt(req.body.per_page) : 0;
  const page_number =
    parseInt(req.body.page_number) > 0 ? parseInt(req.body.page_number) : 1;

  let point_start =
    parseInt(req.body.point_start) > 0 ? parseInt(req.body.point_start) : 0;
  let point_end =
    parseInt(req.body.point_end) > 0 ? parseInt(req.body.point_end) : 0;

  const start_date = req.body.start_date ? formatDate(req.body.start_date) : '';
  let end_date = req.body.end_date ? formatDate(req.body.end_date) : '';
  if (end_date) {
    end_date = new Date(end_date);
    end_date.setDate(end_date.getDate() + 1);
    end_date = end_date.toISOString().split('T')[0];
  }

  let sort_column = req.body.sort_column
    ? req.body.sort_column
    : ' id_history ';
  const sort_order = req.body.sort_order ? req.body.sort_order : ' DESC ';
  sort_column =
    sort_column === 'id_history' ? sort_column + '::integer ' : sort_column;

  let countData = 0;
  let data = '';
  let sql = '';
  if (parseInt(member_id) > 0) checkPointExpired(member_id);
  try {
    let sql_cnt = 'SELECT count(*) FROM redemption_v where is_verify=1';
    if (parseInt(type) > 0) sql_cnt += ' and type =' + parseInt(type);
    if (parseInt(member_id) > 0)
      sql_cnt += ' and member_id =' + parseInt(member_id);
    if (start_date) sql_cnt += ` and created_at::timestamp >= '${start_date}'`;
    if (end_date) sql_cnt += ` and created_at::timestamp <= '${end_date}'`;
    if (point_start > 0) sql_cnt += ` and point >= '${point_start}'`;
    if (point_end > 0) sql_cnt += ` and point <= '${point_end}'`;

    if (keyword || keyword !== '') {
      sql_cnt +=
        ' and ((lower(description) like \'%' +
        keyword.toLowerCase() +
        '%\' or lower(source_fullname) like \'%' +
        keyword.toLowerCase() +
        '%\' or lower(destination_fullname) like \'%' +
        keyword.toLowerCase() +
        '%\' or id_history::text like \'%' +
        keyword +
        '%\' or member_id::text like \'%' +
        keyword +
        '%\'))';
    }
    //console.log(sql_cnt);
    const {
      rows: [cnt]
    } = await client.query(sql_cnt);
    countData = parseInt(cnt.count);
    if (countData > 0) {
      if (keyword || keyword !== '') {
        per_page = per_page > 0 ? per_page : parseInt(cnt.count);
        let offset = (page_number - 1) * per_page;
        sql =
          'SELECT redemption_v.*, transaction_description as description_transaksi FROM redemption_v where is_verify=1';
        if (parseInt(type) > 0) sql += ' and type =' + parseInt(type);
        if (parseInt(member_id) > 0)
          sql += ' and member_id =' + parseInt(member_id);
        if (start_date) sql += ` and created_at::timestamp >= '${start_date}'`;
        if (end_date) sql += ` and created_at::timestamp <= '${end_date}'`;
        sql +=
          ' and ((lower(description) like \'%' +
          keyword.toLowerCase() +
          '%\' or lower(source_fullname) like \'%' +
          keyword.toLowerCase() +
          '%\' or lower(destination_fullname) like \'%' +
          keyword.toLowerCase() +
          '%\' or id_history::text like \'%' +
          keyword +
          '%\' or member_id::text like \'%' +
          keyword +
          '%\'))';
        if (point_start > 0) sql += ` and point >= '${point_start}'`;
        if (point_end > 0) sql += ` and point <= '${point_end}'`;
        sql += ` order by ${sort_column} ${sort_order}`;
        sql += ' LIMIT ' + per_page + ' OFFSET ' + offset;
        data = await client.query(sql);
        //countData = parseInt(data.rowCount);
      } else {
        per_page = per_page > 0 ? per_page : parseInt(cnt.count);
        let offset = (page_number - 1) * per_page;
        sql =
          'SELECT redemption_v.*, transaction_description as description_transaksi FROM redemption_v where is_verify=1';
        if (parseInt(type) > 0) sql += ' and type =' + parseInt(type);
        if (parseInt(member_id) > 0)
          sql += ' and member_id =' + parseInt(member_id);
        if (start_date) sql += ` and created_at::timestamp >= '${start_date}'`;
        if (end_date) sql += ` and created_at::timestamp <= '${end_date}'`;
        if (point_start > 0) sql += ` and point >= '${point_start}'`;
        if (point_end > 0) sql += ` and point <= '${point_end}'`;
        sql += ` order by ${sort_column} ${sort_order}`;
        sql += ' LIMIT ' + per_page + ' OFFSET ' + offset;

        data = await client.query(sql);
      }

      data = data.rows;
    }
    //console.log(sql);
    let resp = {
      success: true,
      message: 'successfully',
      total_data: countData,
      data: data
    };
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'This history was not found'
    });
  }
};

// API GET History Point by member_id
exports.getHistoryPoint = async (req, res) => {
  const { member_id, type } = req.body;
  const start_date = req.body.start_date ? formatDate(req.body.start_date) : '';
  let end_date = req.body.end_date ? formatDate(req.body.end_date) : '';
  if (end_date) {
    end_date = new Date(end_date);
    end_date.setDate(end_date.getDate() + 1);
    end_date = end_date.toISOString().split('T')[0];
  }

  let result = [];
  let response = [];
  let newRes = '';

  if (parseInt(member_id) > 0) checkPointExpired(member_id);

  try {
    let sql =
      'SELECT history_point_v.*, transaction_description as description_transaksi FROM history_point_v WHERE is_verify = 1 and member_id =' +
      member_id;
    if (parseInt(type) > 1) sql += ' and type =' + parseInt(type);
    if (parseInt(type) === 1) sql += ' and type in (1,4)';

    if (start_date) sql += ` and created_at::timestamp >= '${start_date}'`;
    if (end_date) sql += ` and created_at::timestamp <= '${end_date}'`;

    sql += ' ORDER BY id_history DESC';

    const historyPoint = await client.query(sql);

    if (historyPoint.rowCount > 0) {
      result = historyPoint.rows.reduce((group, a) => {
        const created_at = new Date(a.created_at).toISOString().split('T')[0];
        group[created_at] = group[created_at] ?? [];
        group[created_at].push(a);
        return group;
      }, {});
    }
    sql =
      'SELECT point, type, created_at FROM history_point_v WHERE is_verify = 1 and type in(1,2,4) and member_id =' +
      member_id +
      ' ORDER BY created_at DESC';
    const historyLast = await client.query(sql);
    let last_earning = 0;
    let last_redemption = 0;
    let date_last_redemption = '';
    let date_last_earning = '';
    if (historyLast.rowCount > 0) {
      for (let i = 0; i < historyLast.rowCount; i++) {
        let row = historyLast.rows[i];
        if ((row.type === 1 || row.type === 4) && last_earning === 0)
          last_earning = row.point;
        date_last_earning = row.created_at;
        if (row.type === 2 && last_redemption === 0)
          last_redemption = row.point;
        date_last_redemption = row.created_at;
      }
    }

    for (const currentValue in result) {
      newRes = {
        created_at: currentValue,
        data: result[currentValue]
      };
      response = newRes !== '' ? [...response, newRes] : [...response];
    }

    response.sort(function(a, b) {
      var dateA = new Date(a.created_at),
        dateB = new Date(b.created_at);
      return dateB - dateA;
    });

    let resp = {
      success: true,
      message: 'successfully',
      data: response,
      last_earning: last_earning,
      last_redemption: last_redemption,
      date_last_earning: date_last_earning,
      date_last_redemption: date_last_redemption
    };
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'This history was not found'
    });
  }
};

// API GET History point DATA BY id_history
exports.getHistoryPointDetail = async (req, res) => {
  try {
    const {
      rows: [history_point]
    } = await client.query(
      `SELECT history_point_v.*, transaction_description as description_transaksi
       FROM history_point_v
       WHERE id_history = ${req.params.id}`
    );

    return res.status(200).json({
      success: true,
      message: 'successfully.',
      data: history_point
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      error: 'This data was not found.'
    });
  }
};

// API create Transfer
exports.createTransfer = async (req, res) => {
  let date = new Date();
  const description_transaksi = req.body.description_transaksi;
  let amount = req.body.amount ? req.body.amount.replace(/\./g, '') : 0;
  const user_id =
    parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  const member_id =
    parseInt(req.body.member_id) > 0 ? parseInt(req.body.member_id) : 0;
  const member_id_destination =
    parseInt(req.body.member_id_destination) > 0
      ? parseInt(req.body.member_id_destination)
      : 0;

  const about_dealership_id = 30;
  let messages = [];

  amount = amount.replace(/\,/g, '');
  amount = parseInt(amount) > 0 ? parseInt(amount) : 0;
  if (amount <= 0) messages = [...messages, 'amount required'];
  if (member_id <= 0) messages = [...messages, 'member_id required'];
  if (member_id_destination <= 0)
    messages = [...messages, 'member_id_destination required'];
  if (user_id <= 0) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }

  let transaction_code =
    member_id + date.toISOString().split('.')[0] + member_id_destination;
  transaction_code = transaction_code.replace(/[:ZT.-]/g, '');
  const token = jwt.sign(
    { transaction_code, type: 3, member_id_destination, points: amount },
    process.env.JWT_ACC_MEMBER,
    { expiresIn: '20m' }
  );
  let url = process.env.ADMIN_URL + '/verification-transfer?token=' + token;

  let sql_member_source =
    'SELECT points, concat(first_name,\' \',middle_name,\' \',last_name) as source_fullname, email as email_source, active FROM members WHERE member_id =' +
    member_id;

  const {
    rows: [member_source]
  } = await client.query(sql_member_source);

  if (!member_source) {
    messages = [...messages, 'member_id not found'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }
  let { points, source_fullname, active } = member_source;
  if (parseInt(active) != 1) {
    messages = [...messages, 'member_id inactive'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }
  if (amount > Number(points)) {
    messages = [...messages, 'your points are not enough'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }
  let sql_member_destination =
    'SELECT points as points_destination, concat(first_name,\' \',middle_name,\' \',last_name) as destination_fullname, email as destination_email, active as active_dest FROM members WHERE member_id =' +
    member_id_destination;
  const {
    rows: [member_destination]
  } = await client.query(sql_member_destination);
  if (!member_destination) {
    messages = [...messages, 'member_id_destination not found'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }
  let { destination_fullname, active_dest } = member_destination;
  if (parseInt(active_dest) != 1) {
    messages = [...messages, 'member_id_destination inactive'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }
  let values = [
    [
      member_id,
      amount,
      'Transfer to ' + destination_fullname,
      3,
      member_id_destination,
      date,
      description_transaksi,
      user_id,
      0,
      transaction_code,
      about_dealership_id,
      0
    ],
    [
      member_id_destination,
      amount,
      'You get transfer points from ' + source_fullname,
      1,
      null,
      date,
      description_transaksi,
      user_id,
      0,
      transaction_code,
      about_dealership_id,
      amount
    ]
  ];
  let sql =
    'INSERT INTO history_point (member_id, point, description, type, member_id_destination, created_at,transaction_description,created_by,is_verify,transaction_code, about_dealership_id, get_point) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ';
  for (let i = 0; i < values.length; i++) client.query(sql, values[i]);
  // points = Number(points) - amount;

  // let sql_update_member = [
  // 'UPDATE members SET points=' + points + ' WHERE member_id=' + member_id,
  // 'UPDATE members SET points=' +
  // points_destination +
  // ' WHERE member_id=' +
  // member_id_destination,
  // ];
  // for (let i = 0; i < sql_update_member.length; i++) {
  // client.query(sql_update_member[i], (err, result) => {
  // if (err) {
  // let resp = {
  // success: false,
  // message: 'errors',
  // data: err,
  // };
  // return res.status(500).json(resp);
  // }
  // });
  // }

  let sql_admin =
    'SELECT email, first_name FROM users WHERE user_id =' + user_id;
  const {
    rows: [admin]
  } = await client.query(sql_admin);

  let { email, first_name } = admin;
  let templateEmail = sendEmailTransferVerification(
    req,
    member_source,
    member_destination,
    url,
    first_name
  );

  const dataEmail = {
    from: 'your-email',
    to: email,
    subject: 'ORAG Loyalty Platform - Transfer Verification',
    html: templateEmail
  };

  if (email) {
    const sendEmail = transporter.sendMail(dataEmail);
    console.log(sendEmail);
  }
  let resp = {
    success: true,
    message: 'successfully',
    data: req.body,
    url: url,
    token: token
  };
  return res.status(200).json(resp);
};

// API GET Point Definition
exports.getPointDefinition = async (req, res) => {
  try {
    let sql =
      'SELECT * FROM point_definitions ORDER BY point_definition_id ASC';

    const pointDefinitions = await client.query(sql);

    let resp = {
      success: true,
      message: 'successfully',
      data: pointDefinitions.rows
    };
    res.status(200).json(resp);
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      success: false,
      message: 'This history was not found'
    });
  }
};

// API Edit Point Definition
exports.editPointDefinition = async (req, res) => {
  const id =
    parseInt(req.body.point_definition_id) > 0
      ? parseInt(req.body.point_definition_id)
      : 0;
  const user_id =
    parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  let value = req.body.value ? req.body.value.replace(/\./g, '') : 0;

  let messages = [];

  if (id <= 0) messages = [...messages, 'point_definition_id required'];
  if (user_id <= 0) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }
  let sql =
    'UPDATE point_definitions SET value=' +
    value.replace(/\,/g, '') +
    ' WHERE point_definition_id=' +
    id;
  client.query(sql, (err, result) => {
    if (err) {
      let resp = {
        success: false,
        message: 'errors',
        data: err
      };
      return res.status(500).json(resp);
    } else {
      let resp = {
        success: true,
        message: 'successfully',
        data: req.body
      };
      return res.status(200).json(resp);
    }
  });
};

// API create Redemption
exports.createRedemption = async (req, res) => {
  let date = new Date();
  const description_transaksi = req.body.description_transaksi;
  const transaction = req.body.transaction;
  const transaction_type = req.body.transaction_type;
  const about_dealership_id = req.body.about_dealership_id;
  let amount = req.body.point ? req.body.point.replace(/\./g, '') : 0;
  const user_id =
    parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  const member_id =
    parseInt(req.body.member_id) > 0 ? parseInt(req.body.member_id) : 0;

  let messages = [];

  amount = amount.replace(/\./g, '');
  amount = parseInt(amount) > 0 ? parseInt(amount) : 0;
  if (amount <= 0) messages = [...messages, 'point required'];
  if (member_id <= 0) messages = [...messages, 'member_id required'];
  if (transaction_type === '')
    messages = [...messages, 'transaction_type required'];
  if (about_dealership_id === '' || about_dealership_id <= 0)
    messages = [...messages, 'about_dealership_id required'];
  if (user_id <= 0) messages = [...messages, 'user_id required'];

  const pointDefinitions = await client.query(
    'SELECT * FROM point_definitions'
  );
  let dataPointDefinitions = pointDefinitions.rows;
  let settingPointDefinition = [];
  let unitPointDefinition = [];
  let descriptionPointDefinition = [];
  for (let i = 0; i < dataPointDefinitions.length; i++) {
    settingPointDefinition[dataPointDefinitions[i].key] =
      dataPointDefinitions[i].value;
    unitPointDefinition[dataPointDefinitions[i].key] =
      dataPointDefinitions[i].unit;
    descriptionPointDefinition[dataPointDefinitions[i].key] =
      dataPointDefinitions[i].description +
      ' ' +
      dataPointDefinitions[i].unit +
      '' +
      dataPointDefinitions[i].value;
  }
  const { The_number_of_points, minimum_services, maximum_service } =
    settingPointDefinition;
  const minimum_point_redeem =
    parseInt(The_number_of_points) * parseInt(minimum_services);
  const maximum_point_redeem =
    parseInt(The_number_of_points) * parseInt(maximum_service);
  if (parseInt(minimum_point_redeem) > amount)
    messages = [...messages, descriptionPointDefinition['minimum_services']];
  if (parseInt(maximum_point_redeem) < amount)
    messages = [...messages, descriptionPointDefinition['maximum_service']];

  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }

  let transaction_code = member_id + date.toISOString().split('.')[0];
  transaction_code = transaction_code.replace(/[:ZT.-]/g, '');
  const token = jwt.sign(
    { transaction_code, type: 2 },
    process.env.JWT_ACC_MEMBER,
    { expiresIn: '20m' }
  );

  let url = process.env.ADMIN_URL + '/verification-transfer?token=' + token;

  let sql_member_source =
    'SELECT points, concat(first_name,\' \',middle_name,\' \',last_name) as source_fullname, email as email_source, active FROM members WHERE member_id =' +
    member_id;

  const {
    rows: [member_source]
  } = await client.query(sql_member_source);

  if (!member_source) {
    messages = [...messages, 'member_id not found'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }
  let { points, active } = member_source;
  if (parseInt(active) != 1) {
    messages = [...messages, 'member_id inactive'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }

  if (amount > Number(points)) {
    messages = [...messages, 'your points are not enough'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }

  let values = [
    [
      member_id,
      '-' + amount,
      'Redemption point ' + amount,
      2,
      transaction,
      date,
      description_transaksi,
      user_id,
      0,
      transaction_code,
      transaction_type,
      about_dealership_id
    ]
  ];
  let sql =
    'INSERT INTO history_point (member_id, point, description, type, transaction, created_at,transaction_description, created_by,is_verify,transaction_code,transaction_type, about_dealership_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) ';
  for (let i = 0; i < values.length; i++) client.query(sql, values[i]);

  // points = Number(points) - amount;
  // let sql_update_member = [
  // 'UPDATE members SET points=' + points + ' WHERE member_id=' + member_id,
  // ];
  // for (let i = 0; i < sql_update_member.length; i++) {
  // client.query(sql_update_member[i], (err, result) => {
  // if (err) {
  // let resp = {
  // success: false,
  // message: 'errors',
  // data: err,
  // };
  // return res.status(500).json(resp);
  // }
  // });
  // }

  let sql_admin =
    'SELECT email, first_name FROM users WHERE user_id =' + user_id;
  const {
    rows: [admin]
  } = await client.query(sql_admin);
  let { email, first_name } = admin;

  const templateEmail = sendEmailRedemptionVerification(
    req,
    member_source,
    req.body,
    url,
    first_name
  );

  const dataEmail = {
    from: 'your-email',
    to: email,
    subject: 'ORAG Loyalty Platform - Redemption Verification',
    html: templateEmail
  };
  if (email) {
    const sendEmail = transporter.sendMail(dataEmail);
    //console.log(sendEmail);
  }
  let resp = {
    success: true,
    message: 'successfully',
    data: req.body,
    url: url,
    token: token
  };
  return res.status(200).json(resp);
};

// API add Point
exports.addPoint = async (req, res) => {
  let date = new Date();
  const description_transaksi = req.body.description_transaksi;
  const transaction = req.body.transaction;
  const ro_number = req.body.ro_number;
  const transaction_type = req.body.transaction_type;
  const about_dealership_id = req.body.about_dealership_id;
  let amount = req.body.point ? req.body.point.replace(/\./g, '') : 0;
  const user_id =
    parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  const member_id =
    parseInt(req.body.member_id) > 0 ? parseInt(req.body.member_id) : 0;

  let messages = [];

  amount = amount.replace(/\./g, '');
  amount = parseInt(amount) > 0 ? parseInt(amount) : 0;
  if (amount <= 0) messages = [...messages, 'point required'];
  if (member_id <= 0) messages = [...messages, 'member_id required'];
  if (transaction_type === '')
    messages = [...messages, 'transaction_type required'];
  if (about_dealership_id === '' || about_dealership_id <= 0)
    messages = [...messages, 'about_dealership_id required'];
  if (user_id <= 0) messages = [...messages, 'user_id required'];

  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }
  let sql_member_source =
    'SELECT points, concat(first_name,\' \',middle_name,\' \',last_name) as source_fullname, email as email_source, active FROM members WHERE member_id =' +
    member_id;
  const {
    rows: [member_source]
  } = await client.query(sql_member_source);
  /*let { points, active } = member_source;
  if (parseInt(active) != 1) {
    messages = [...messages, 'member_id inactive'];
    return res.status(404).json({
      success: false,
      error: 'no content',
      data: messages
    });
  }*/
  let transaction_code = member_id + date.toISOString().split('.')[0];
  transaction_code = transaction_code.replace(/[:ZT.-]/g, '');
  const token = jwt.sign(
    { transaction_code, type: 4 },
    process.env.JWT_ACC_MEMBER,
    { expiresIn: '20m' }
  );

  let url = process.env.ADMIN_URL + '/verification-transfer?token=' + token;

  let values = [
    [
      member_id,
      amount,
      'Add point ' + amount,
      4,
      transaction,
      date,
      description_transaksi,
      user_id,
      0,
      transaction_code,
      transaction_type,
      about_dealership_id,
      ro_number,
      amount
    ]
  ];
  let sql =
    'INSERT INTO history_point (member_id, point, description, type, transaction, created_at,transaction_description, created_by,is_verify,transaction_code,transaction_type, about_dealership_id, ro_number, get_point) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ';
  for (let i = 0; i < values.length; i++) client.query(sql, values[i]);
  let sql_admin =
    'SELECT email, first_name FROM users WHERE user_id =' + user_id;
  const {
    rows: [admin]
  } = await client.query(sql_admin);
  let { email, first_name } = admin;

  const templateEmail = sendEmailAddPointVerification(
    req,
    member_source,
    req.body,
    url,
    first_name
  );

  const dataEmail = {
    from: 'your-email',
    to: email,
    subject: 'ORAG Loyalty Platform - Add Point Verification',
    html: templateEmail
  };

  if (email) {
    const sendEmail = transporter.sendMail(dataEmail);
  }
  let resp = {
    success: true,
    message: 'successfully',
    data: req.body,
    url: url,
    token: token
  };
  return res.status(200).json(resp);
};

// Verify Transaksi
exports.verify_transaction = async (req, res) => {
  let date = new Date();
  const { token, user_id } = req.body;
  let messages = [];
  if (!token) messages = [...messages, 'token required'];
  if (!user_id) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }
  try {
    jwt.verify(
      token,
      process.env.JWT_ACC_MEMBER,
      async function(err, decodedToken) {
        if (err) {
          console.log(err);
          return res.status(404).json({
            success: false,
            error: 'Incorrect token or token expired'
          });
        }
        const { transaction_code, type } = decodedToken;

        let sql = `SELECT *
                   FROM history_point
                   WHERE type = ${type}
                     and is_verify = 0
                     and transaction_code = '${transaction_code}'`;

        const historyPoint = await client.query(sql);

        if (historyPoint.rowCount > 0) {
          const {
            rows: [data_transaksi]
          } = await client.query(sql);

          let sql_member_source =
            'SELECT points, concat(first_name,\' \',middle_name,\' \',last_name) as source_fullname, email as email_source, member_id FROM members WHERE member_id =' +
            data_transaksi.member_id;

          const {
            rows: [member_source]
          } = await client.query(sql_member_source);

          let amount = data_transaksi.point;
          if (parseInt(type) === 2 || parseInt(type) === 4) {
            amount = amount * -1;
          }
          let points = member_source.points;
          if (
            points < amount &&
            (parseInt(type) === 2 || parseInt(type) === 3)
          ) {
            return res.status(400).json({
              success: false,
              error: 'Sorry, verification failed'
            });
            return false;
          }
          const contacts = await client.query(
            `SELECT email, phone_number
             FROM help_center_contact
             where status = true`
          );
          let dataContact = 'Contact Service : ';
          for (let i = 0; i < contacts.rowCount; i++) {
            let email_contact = contacts.rows[i].email;
            let phone_number_contact = contacts.rows[i].phone_number;
            let numb = Number(i) + 1;
            dataContact += `<br/>${phone_number_contact} | <span style='color:#44C8F5'>${email_contact}</span><br />`;
          }
          sql = `UPDATE history_point
                 SET is_verify=1,
                     verify_by   = ${user_id},
                     verify_date = '${date.toISOString()}'
                 WHERE is_verify = 0
                   and transaction_code = '${transaction_code}'`;

          await client.query(sql, (err, result) => {
            if (err) {
              let resp = {
                success: false,
                message: 'errors',
                data: err
              };
              return res.status(500).json(resp);
            }
          });

          points = Number(points) - amount;
          let sql_update_member = [
            'UPDATE members SET points=' +
            points +
            ' WHERE member_id=' +
            data_transaksi.member_id
          ];
          for (let i = 0; i < sql_update_member.length; i++) {
            client.query(sql_update_member[i], (err, result) => {
              if (err) {
                let resp = {
                  success: false,
                  message: 'errors',
                  data: err
                };
                return res.status(500).json(resp);
              }
            });
          }
          sql = `SELECT history_point.*, transaction_description as description_transaksi
                 FROM history_point
                 WHERE transaction_code = '${transaction_code}'`;
          const {
            rows: [transaksi]
          } = await client.query(sql);

          let { source_fullname, email_source } = member_source;
          let templateEmail =
            parseInt(type) === 2
              ? sendEmailRedemptionNotification(
                req,
                member_source,
                transaksi,
                dataContact
              )
              : sendAddPointNotification(
                req,
                member_source,
                transaksi,
                dataContact
              );
          let subject =
            parseInt(type) === 2
              ? 'ORAG Loyalty Platform - Redemption Notification'
              : 'ORAG Loyalty Platform - Add Point Notification';

          if (parseInt(type) === 3) {
            const { member_id_destination, points } = decodedToken;
            let sql_member_destination =
              'SELECT points as points_destination, concat(first_name,\' \',middle_name,\' \',last_name) as destination_fullname, email as email_destination, member_id as id_member_destination FROM members WHERE member_id =' +
              member_id_destination;
            const {
              rows: [member_destination]
            } = await client.query(sql_member_destination);
            let { points_destination, email_destination } = member_destination;
            points_destination = Number(points_destination) + Number(points);
            let sql_update_member =
              'UPDATE members SET points=' +
              points_destination +
              ' WHERE member_id=' +
              member_id_destination;
            await client.query(sql_update_member, (err, result) => {
              if (err) {
                let resp = {
                  success: false,
                  message: 'errors',
                  data: err
                };
                return res.status(500).json(resp);
              }
            });

            templateEmail = sendEmailTransferNotificationSource(
              req,
              member_source,
              member_destination,
              transaksi,
              dataContact
            );
            let templateEmail2 = sendEmailTransferNotificationDestination(
              req,
              member_source,
              member_destination,
              transaksi,
              dataContact
            );
            subject = 'ORAG Loyalty Platform - Transfer Notification';

            const dataEmail2 = {
              from: 'your-email',
              to: email_destination,
              subject: subject,
              html: templateEmail2
            };
            if (email_destination) {
              transporter.sendMail(dataEmail2);
            }
          }
          if (type === 2 || type === 3)
            calculatePointExpired(
              data_transaksi.member_id,
              amount,
              data_transaksi.id_history
            );

          if (email_source) {
            const dataEmail = {
              from: 'your-email',
              to: email_source,
              subject: subject,
              html: templateEmail
            };
            const sendEmail = transporter.sendMail(dataEmail);
          }
          let resp = {
            success: true,
            message: 'successfully',
            transaction_id: data_transaksi.id_history,
            data: req.body
          };
          console.log(resp);
          return res.status(200).json(resp);
        } else {
          return res.status(404).json({
            success: false,
            error: 'Sorry, verification failed'
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    let resp = {
      success: false,
      message: 'Sorry, verification failed',
      data: err
    };
    return res.status(500).json(resp);
  }
};

async function calculatePointExpired(member_id, amount, transaction_id) {
  console.log(transaction_id);
  let sql = `SELECT *
             FROM get_point_v
             WHERE member_id = ${member_id}
             ORDER BY id_history ASC`;
  const get_point_v = await client.query(sql);
  if (get_point_v.rowCount > 0) {
    const results = get_point_v.rows;
    let needPoint = 0;
    let id_history = '';
    for (let i = 0; i < get_point_v.rowCount; i++) {
      const getPoint =
        Number(results[i].get_point) < 0
          ? Number(results[i].get_point) * -1
          : Number(results[i].get_point);
      needPoint = needPoint + Number(getPoint);
      if (needPoint >= amount) {
        let get_point = needPoint - amount;
        sql = `update history_point
               set get_point=${get_point}
               where id_history = ${results[i].id_history}`;
        console.log('sql1', sql);
        await client.query(sql);
        i = get_point_v.rowCount;
      } else {
        let id = results[i].id_history;
        id_history += id + ',';
      }
    }
    if (id_history !== '') {
      id_history += '0';
      sql = `update history_point
             set get_point=0
             where id_history in (${id_history})`;
      console.log('sql2', sql);
      await client.query(sql);
    }
  }
}

async function checkPointExpired(member_id) {
  const pointDefinitions = await client.query(
    `SELECT *
     FROM point_definitions
     where key ='points_expiration'`
  );
  let dataPointDefinitions = pointDefinitions.rows;
  let settingPointDefinition = [];
  for (let i = 0; i < dataPointDefinitions.length; i++) {
    settingPointDefinition[dataPointDefinitions[i].key] =
      dataPointDefinitions[i].value;
  }
  const { points_expiration } = settingPointDefinition;
  let date = new Date();
  let pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - Number(points_expiration));
  pastDate.setDate(pastDate.getDate() + 1);
  let created_at = new Date(pastDate).toISOString().split('T')[0];
  const sql_expired = `SELECT *
                       FROM get_point_v
                       WHERE to_char(created_at, 'YYYY-MM-DD') = '${created_at}'
                         and member_id = ${member_id}`;
  const expired = await client.query(sql_expired);
  if (expired.rowCount > 0) {
    const res = expired.rows;
    for (let i = 0; i < expired.rowCount; i++) {
      let point_expired = res[i].get_point;
      let member_id = res[i].member_id;
      let sql_upd = `update history_point
                     set get_point=0,
                         point_expired=${point_expired},
                         expired_at='${date}'
                     where id_history = ${res[i].id_history}
                       and get_point = ${point_expired}
                       and expired_at is null`;
      await client.query(sql_upd, (err, result) => {
        if (err) console.log(err);
        if (result.rowCount > 0) {
          let sql_member = `UPDATE members
                            set points=points - ${point_expired}
                            WHERE member_id = ${member_id}`;
          client.query(sql_member);
        }
      });
    }
  }
}
