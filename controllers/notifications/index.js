'use strict';

const client = require('../../connection');

// HELPER MODULE
const helperModule = require('../../helpers/module');
const { transporter, formatDate } = helperModule;

// API GET ALL notification data
exports.getDataNotification = async (req, res) => {
  const { keyword, read } = req.body;
  let per_page =
    parseInt(req.body.per_page) > 0 ? parseInt(req.body.per_page) : 0;
  const page_number =
    parseInt(req.body.page_number) > 0 ? parseInt(req.body.page_number) : 1;
  const status = parseInt(req.body.status) > 0 ? parseInt(req.body.status) : 0;

  const start_date = req.body.start_date ? formatDate(req.body.start_date) : '';
  let end_date = req.body.end_date ? formatDate(req.body.end_date) : '';
  let member_id = req.body.member_id ? parseInt(req.body.member_id) : 0;

  if (end_date) {
    end_date = new Date(end_date);
    end_date.setDate(end_date.getDate() + 1);
    end_date = end_date.toISOString().split('T')[0];
  }

  let sort_column = req.body.sort_column
    ? req.body.sort_column
    : ' notification_id ';
  const sort_order = req.body.sort_order ? req.body.sort_order : ' DESC ';
  sort_column =
    sort_column === 'notification_id'
      ? sort_column + '::integer '
      : sort_column;

  let countData = 0;
  let data = '';
  let sql = '';

  try {
    let sql_cnt =
      'SELECT count(*) FROM notifications WHERE notifications.deleted_at is null';
    if (parseInt(status) > 0)
      sql_cnt += ' and notifications.status =' + parseInt(status);
    if (parseInt(member_id) > 0)
      sql_cnt +=
        ' and notifications.last_member_id >=' +
        parseInt(member_id) +
        ' and notifications.status =2';
    if (start_date)
      sql_cnt += ` and published_at::timestamp >= '${start_date}'`;
    if (end_date) sql_cnt += ` and published_at::timestamp <= '${end_date}'`;
    if (parseInt(read) > 0) {
      if (read === 2) {
        sql_cnt += ` and (SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id)=0`;
      } else {
        sql_cnt += ` and (SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id)=1`;
      }
    }

    const {
      rows: [cnt],
    } = await client.query(sql_cnt);
    countData = parseInt(cnt.count);
    if (countData > 0) {
      if (keyword) {
        per_page = per_page > 0 ? per_page : parseInt(cnt.count);
        let offset = (page_number - 1) * per_page;
        sql =
          'SELECT notifications.*,(SELECT count(*) FROM notifications_read WHERE member_id = ' +
          parseInt(member_id) +
          ' and notifications_read.notification_id = notifications.notification_id) as read FROM notifications  WHERE notifications.deleted_at is null';
        if (parseInt(status) > 0)
          sql += ' and notifications.status =' + parseInt(status);
        if (parseInt(member_id) > 0)
          sql += ' and notifications.last_member_id >=' + parseInt(member_id);
        if (start_date)
          sql += ` and published_at::timestamp >= '${start_date}'`;
        if (end_date) sql += ` and published_at::timestamp <= '${end_date}'`;
        if (parseInt(read) > 0) {
          if (read === 2) {
            sql += ` and (SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id)=0`;
          } else {
            sql += ` and (SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id)=1`;
          }
        }
        sql +=
          " and (lower(title) like '%" +
          keyword.toLowerCase() +
          "%' or lower(content) like '%" +
          keyword.toLowerCase() +
          "%')";
        sql += ` order by ${sort_column} ${sort_order}`;
        sql += ' LIMIT ' + per_page + ' OFFSET ' + offset;

        data = await client.query(sql);
        countData = parseInt(data.rowCount);
      } else {
        per_page = per_page > 0 ? per_page : parseInt(cnt.count);
        let offset = (page_number - 1) * per_page;
        sql = `SELECT notifications.*,(SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id) as read FROM notifications WHERE notifications.deleted_at is null`;
        if (parseInt(status) > 0)
          sql += ' and notifications.status =' + parseInt(status);
        if (parseInt(member_id) > 0)
          sql += ' and notifications.last_member_id >=' + parseInt(member_id);
        if (start_date)
          sql += ` and published_at::timestamp >= '${start_date}'`;
        if (end_date) sql += ` and published_at::timestamp <= '${end_date}'`;
        if (parseInt(read) > 0) {
          if (read === 2) {
            sql += ` and (SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id)=0`;
          } else {
            sql += ` and (SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notifications_read.notification_id = notifications.notification_id)=1`;
          }
        }
        sql += ` order by ${sort_column} ${sort_order}`;
        sql += ' LIMIT ' + per_page + ' OFFSET ' + offset;

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
      message: 'This history was not found',
    });
  }
};

// API Save data Notification
exports.saveDataNotification = async (req, res) => {
  const { title, content, link } = req.body;
  const status = parseInt(req.body.status) > 0 ? parseInt(req.body.status) : 1;
  const user_id =
    parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  const id =
    parseInt(req.body.notification_id) > 0
      ? parseInt(req.body.notification_id)
      : 0;
  const in_app = parseInt(req.body.in_app) > 0 ? parseInt(req.body.in_app) : 0;
  const email = parseInt(req.body.email) > 0 ? parseInt(req.body.email) : 0;
  let messages = [];
  if (status === 2) {
    if (!title || title === '') messages = [...messages, 'title required'];
    if (!content || content === '')
      messages = [...messages, 'content required'];
    if (!link || link === '') messages = [...messages, 'link required'];
    if (in_app === 0 && email === 0)
      messages = [...messages, 'media pengiriman harus dipilih'];
  }
  if (user_id <= 0) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages,
    });
  }

  let postData = {
    title: title,
    content: content,
    link: link,
    status: status,
    in_app: in_app,
    email: email,
  };
  if (status === 2) {
    const sql_member = 'SELECT max(member_id) as member_id FROM members';
    const {
      rows: [members],
    } = await client.query(sql_member);
    postData = {
      ...postData,
      published_by: user_id,
      published_at: new Date(),
      last_member_id: parseInt(in_app) > 0 ? parseInt(members.member_id) : 0,
    };

    if (parseInt(email) > 0) {
      const sql_member_email =
        "SELECT email FROM members WHERE email is not null and active= '1'::bit and to_char(created_date, 'YYYY') = '2022' and to_char(created_date, 'mm')::integer >= 9 and email_promotions  = '1'::bit group by email";
      const dataEmail = await client.query(sql_member_email);
      if (dataEmail.rowCount > 0) {
        let msg = {
          from: 'noreply-cor@openroadautogroup.com',
          subject: title,
          html: content,
        };
        dataEmail.rows.map(function (val) {
          if (val.email !== '' || val.email.length > 0) {
            msg = { ...msg, to: val.email };
            return transporter.sendMail(msg);
          } else {
            return true;
          }
        });
      }
    }
  }

  let sql = '';
  let columns = '';
  let values = '';
  if (id > 0) {
    if (status === 1) {
      postData = {
        ...postData,
        updated_by: user_id,
        updated_at: new Date(),
      };
    }
    values = Object.values(postData);
    sql = 'UPDATE notifications SET ';
    Object.keys(postData).forEach(function (key, i) {
      sql += key + ' = $' + (i + 1);
      if (i !== values.length - 1) {
        sql += ',';
      }
    });
    sql += '  WHERE notification_id =' + id;
  } else {
    postData = {
      ...postData,
      created_by: user_id,
      created_at: new Date(),
    };
    columns = Object.keys(postData);
    values = Object.values(postData);
    sql = 'INSERT INTO notifications (' + columns.join(',') + ') VALUES (';
    for (let i = 0; i < values.length; i++) {
      sql += '$' + Number(i + 1);
      if (i !== values.length - 1) {
        sql += ',';
      }
    }
    sql += ')';
  }
  if (status === 2 && parseInt(email) > 0) {
    let sql_member = 'SELECT email FROM members group by email';
    let data = await client.query(sql_member);
    if (data.rowCount > 0) {
      data = data.rows;
      console.log(data);
    }

    //send email
  }
  client.query(sql, values, (err, result) => {
    if (err) {
      let resp = {
        success: false,
        message: 'errors',
        data: err,
      };
      return res.status(500).json(resp);
    } else {
      let resp = {
        success: true,
        message: 'successfully',
        data: postData,
      };
      return res.status(200).json(resp);
    }
  });
};

// API GET Notification Detail BY notification_id
exports.getNotificationDetail = async (req, res) => {
  const member_id =
    parseInt(req.params.member_id) > 0 ? parseInt(req.params.member_id) : 0;
  const date = new Date();
  try {
    let {
      rows: [notifications],
    } = await client.query(
      `SELECT notification_id,title,content,link,status,created_at,published_at, in_app, email FROM notifications WHERE notifications.deleted_at is null and notification_id = ${req.params.id}`
    );
    if (member_id > 0) {
      notifications = { ...notifications, read: 1 };
      let sql_cnt = `SELECT count(*) FROM notifications_read WHERE member_id = ${member_id} and notification_id = ${req.params.id}`;
      const {
        rows: [cnt],
      } = await client.query(sql_cnt);
      const countData = parseInt(cnt.count);
      if (countData <= 0) {
        let values = [member_id, req.params.id, date];
        let sql =
          'INSERT INTO notifications_read (member_id, notification_id, created_at) VALUES ($1, $2, $3) ';
        client.query(sql, values);
      }
    }
    return res.status(200).json({
      success: true,
      message: 'successfully.',
      data: notifications,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      error: 'This data was not found.',
    });
  }
};

// API delete data Notification
exports.deleteDataNotification = async (req, res) => {
  const user_id =
    parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;

  let messages = [];
  if (req.body.notification_id.length === 0)
    messages = [...messages, 'notification_id required'];
  if (user_id <= 0) messages = [...messages, 'user_id required'];

  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages,
    });
  }

  let postData = {
    deleted_by: user_id,
    deleted_at: new Date(),
  };

  let sql = '';
  let values = '';
  values = Object.values(postData);
  sql = 'UPDATE notifications SET ';
  Object.keys(postData).forEach(function (key, i) {
    sql += key + ' = $' + (i + 1);
    if (i !== values.length - 1) {
      sql += ',';
    }
  });
  sql += '  WHERE notification_id in(' + req.body.notification_id + ')';

  client.query(sql, values, (err, result) => {
    if (err) {
      let resp = {
        success: false,
        message: 'errors',
        data: err,
      };
      return res.status(500).json(resp);
    } else {
      let resp = {
        success: true,
        message: 'successfully',
        data: postData,
      };
      return res.status(200).json(resp);
    }
  });
};
