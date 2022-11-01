'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');
const fs = require('fs');
const { parse } = require('csv-parse');
const https = require('https');


async function parseCSV(dirFile) {
  const dir = dirFile;

  await client.query('DELETE FROM service_transaction');
  fs.createReadStream(dir + '/service_transaction.csv', { encoding: 'utf-8' })
    .pipe(parse({ delimiter: ',', columns: true }))
    .on('data', async function(row) {
      let { closedate, ronumber, posteddate, name, accountingaccount, dealership_name, rosalecp, email } = row;
      if (Number(rosalecp) > 0) {
        name = name.replace('\'', '');
        posteddate = posteddate ? posteddate : '1700-01-01 00:00:00';
        closedate = closedate ? closedate : '1700-01-01 00:00:00';

        let from = closedate.split(' ');
        from = from[0].split('-');
        let closedates = from[0] + '-' + from[1] + '-' + from[2];
        closedates = new Date(closedates).toISOString().split('T')[0];

        ronumber = ronumber ? ronumber : 0;
        email = email ? email : 'no-email';
        email = email.toLowerCase();
        let insert_at = new Date().toISOString();
        let sql = 'insert into service_transaction(closedate,ronumber,name,accountingaccount,dealership_name,posteddate,rosalecp, email, insert_at) VALUES (\'' + closedates + '\',\'' + ronumber + '\',\'' + name + '\',\'' + accountingaccount + '\',\'' + dealership_name + '\',\'' + posteddate + '\',\'' + rosalecp + '\',\'' + email + '\',\'' + insert_at + '\')';
        await client.query(sql, (err, result) => {
          if (err) {
            console.log(sql);
            console.log(err);
          }
        });
      }
    }).on('error', function(error) {
    console.log(error.message);
  });
}

exports.getDataCSV = async (req, res) => { /*ini buat testing*/
  /*let date = new Date();
  date.setDate(date.getDate() - 2);*/
  let date = '2022-10-05';
  const dir = 'data_service_transaction/' + date;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const file = fs.createWriteStream(dir + '/service_transaction.csv');
  const request = https.get('https://storage.googleapis.com/orag_loyalty_new/webhook/' + date + '/service_trans.csv', function(response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      parseCSV(dir);
      console.log('Download Completed');
    });
  });
  let resp = {
    success: true,
    message: 'successfully'
  };
  return res.status(200).json(resp);
};

exports.getDataCSVToday = async (req, res) => { /*ini buat live*/
  let date = new Date();
  date.setDate(date.getDate() - 1);
  date = new Date(date).toISOString().split('T')[0];
  const dir = 'data_service_transaction/' + date;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const file = fs.createWriteStream(dir + '/service_transaction.csv');
  const request = https.get('https://storage.googleapis.com/orag_loyalty_new/webhook/' + date + '/service_trans.csv', function(response) {
    response.pipe(file);

    // after download completed close filestream
    file.on('finish', () => {
      file.close();
      parseCSV(dir);
      console.log('Download Completed');
    });
  });
  let resp = {
    success: true,
    message: 'successfully'
  };
  return res.status(200).json(resp);
};

exports.getDataCSVDirect = async (req, res) => { /*ini buat live*/
  /*let date = new Date();
  date.setDate(date.getDate() - 2);*/
  let date = '2022-10-05';
  const result = [];
  const url = 'https://storage.googleapis.com/orag_loyalty_new/webhook/' + date + '/service_trans.csv';
  await client.query('DELETE FROM service_transaction');
  https.request(url, response => { //Make request to URL
    response.pipe(
      //YOUR CODE
      parse({
        delimiter: ',',
        skip_empty_lines: true, columns: true
      })
    ).on('data', async (row) => {
      //result.push(row);
      let { closedate, ronumber, posteddate, name, accountingaccount, dealership_name, rosalecp, email } = row;
      if (Number(rosalecp) > 0) {
        console.log('start insert ', ronumber);
        name = name.replace('\'', '');
        posteddate = posteddate ? posteddate : '1700-01-01 00:00:00';
        closedate = closedate ? closedate : '1700-01-01 00:00:00';
        ronumber = ronumber ? ronumber : 0;
        email = email ? email : 'no-email';
        let sql = 'insert into service_transaction(closedate,ronumber,name,accountingaccount,dealership_name,posteddate,rosalecp, email) VALUES (\'' + closedate + '\',\'' + ronumber + '\',\'' + name + '\',\'' + accountingaccount + '\',\'' + dealership_name + '\',\'' + posteddate + '\',\'' + rosalecp + '\',\'' + email + '\')';

        await client.query(sql, (err, result) => {
          if (err) {
            console.log(sql);
            console.log(err);
          }
        });
      }
    });
  })
    .on('error', function(error) {
      console.log(error.message);
    }).end();
  let resp = {
    success: true,
    message: 'successfully'
  };
  return res.status(200).json(resp);
};

exports.checkPointExpired = async (req, res) => {
  let date1 = new Date();
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
  let date = new Date().toISOString();
  let pastDate = new Date();
  pastDate.setFullYear(pastDate.getFullYear() - Number(points_expiration));
  pastDate.setDate(pastDate.getDate() + 1);
  let created_at = new Date(pastDate).toISOString().split('T')[0];
  const sql_expired = `SELECT *
                       FROM get_point_v
                       WHERE to_char(created_at, 'YYYY-MM-DD') <= '${created_at}'
                       order by id_history DESC limit 250`;
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
  date1.setDate(date1.getDate() - 1);
  date1 = new Date(date1).toISOString().split('T')[0];
  let sql_upd1 = `update history_point
                  set get_point=0
                  where to_char(created_at, \'YYYY-MM-DD\') = '${date1}'
                    and is_verify = 0
                    and get_point > 0
                    and expired_at is null`;
  client.query(sql_upd1);
  let resp = {
    success: true,
    message: 'successfully'
  };
  return res.status(200).json(resp);
};