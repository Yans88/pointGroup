'use strict';

// IMPORT ALL PACKAGES
const client = require('../../connection');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86000 });
const excelJS = require('exceljs');

// API GET statistics member
exports.members = async (req, res) => {
  let date = new Date();
  let myPastDate = new Date(date);

  const { year1, year2 } = req.body;
  // const user_id = parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  let filter = parseInt(req.body.filter) > 0 ? parseInt(req.body.filter) : 1;
  let filter_show =
    parseInt(req.body.filter_show) > 0 ? parseInt(req.body.filter_show) : 0;

  let result = [];
  let response = [];
  let responseYOY = [];
  let resss = [];
  let newRes = '';
  let messages = [];
  let total_activated = 0;
  let total_non_activated = 0;

  if (filter === 4) {
    if (!year1) messages = [...messages, 'year1 required'];
    if (!year2) messages = [...messages, 'year2 required'];
  }
  //if (user_id <= 0) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }

  try {
    let sql = '';
    if (filter === 1) {
      sql =
        'SELECT count(*),CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END as created_date,active as activated FROM members';
      sql +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END >= CURRENT_DATE - \'6 days\'::interval ';
      sql +=
        ' GROUP BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END, active ';
      sql +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END DESC';
      myPastDate.setDate(myPastDate.getDate() - 6);
    }

    if (filter === 2) {
      sql =
        'SELECT count(*),CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END as created_date,active as activated FROM members';
      sql +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END >= CURRENT_DATE - \'13 days\'::interval ';
      sql +=
        ' GROUP BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END, active ';
      sql +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END DESC';
      myPastDate.setDate(myPastDate.getDate() - 13);
    }

    if (filter === 3) {
      sql =
        'SELECT count(*),CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END as created_date,active as activated FROM members';
      sql +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END >= CURRENT_DATE - \'29 days\'::interval ';
      sql +=
        ' GROUP BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END, active ';
      sql +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END DESC';
      myPastDate.setMonth(myPastDate.getMonth() - 1);
    }

    if (filter === 4) {
      sql =
        'SELECT count(*),CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY-MM\') ELSE to_char(members.created_date, \'YYYY-MM\') END as created_date,active as activated FROM members ';
      sql +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY\') ELSE to_char(members.created_date, \'YYYY\') END in(\'' +
        year1 +
        '\',\'' +
        year2 +
        '\') ';
      sql +=
        ' GROUP BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY-MM\') ELSE to_char(members.created_date, \'YYYY-MM\') END,active ';
      sql +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY-MM\') ELSE to_char(members.created_date, \'YYYY-MM\') END DESC';

      let sql2 =
        'SELECT count(*),CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY\') ELSE to_char(members.created_date, \'YYYY\') END as created_date,active as activated FROM members ';
      sql2 +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY\') ELSE to_char(members.created_date, \'YYYY\') END in(\'' +
        year1 +
        '\',\'' +
        year2 +
        '\') ';
      sql2 +=
        ' GROUP BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY\') ELSE to_char(members.created_date, \'YYYY\') END,active ';
      sql2 +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY\') ELSE to_char(members.created_date, \'YYYY\') END DESC';

      const statisticsYOY = await client.query(sql2);
      if (statisticsYOY.rowCount > 0) {
        resss = statisticsYOY.rows.reduce((group, a) => {
          const created_date = a.created_date;
          group[created_date] = group[created_date] ?? [];
          group[created_date].push(a);
          return group;
        }, {});
      }
      let newRess = {
        created_at: year1,
        activated: 0,
        non_activated: 0
      };
      const yoy = [year1, year2];
      for (let j = 0; j < 2; j++) {
        let activated = 0;
        let non_activated = 0;
        if (resss[yoy[j]]) {
          for (let i = 0; i < resss[yoy[j]].length; i++) {
            if (parseInt(resss[yoy[j]][i].activated) > 0)
              activated = parseInt(resss[yoy[j]][i].count);
            if (parseInt(resss[yoy[j]][i].activated) === 0)
              non_activated = parseInt(resss[yoy[j]][i].count);
          }
        }

        newRess = {
          created_at: yoy[j],
          activated: activated,
          non_activated: non_activated
        };
        responseYOY =
          newRess !== '' ? [...responseYOY, newRess] : [...responseYOY];
      }
    }

    if (filter === 5) {
      sql = 'SELECT count(*), members.active as activated,';
      sql +=
        'CASE WHEN (members.admin_action_date IS NOT NULL) THEN concat(to_char(members.admin_action_date, \'MM\'),\'-\',date_part(\'week\', members.admin_action_date)) ELSE concat(to_char(members.created_date, \'MM\'),\'-\',date_part(\'week\', members.created_date)) END FROM members ';
      sql +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END >= CURRENT_DATE - \'1 month\'::interval ';
      sql +=
        ' GROUP BY members.active, CASE WHEN (members.admin_action_date IS NOT NULL) THEN concat(to_char(members.admin_action_date, \'MM\'),\'-\',date_part(\'week\', members.admin_action_date)) ELSE concat(to_char(members.created_date, \'MM\'),\'-\',date_part(\'week\', members.created_date)) END ';
      sql +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN concat(to_char(members.admin_action_date, \'MM\'),\'-\',date_part(\'week\', members.admin_action_date)) ELSE concat(to_char(members.created_date, \'MM\'),\'-\',date_part(\'week\', members.created_date)) END DESC Limit 4';
    }

    if (filter === 6) {
      sql =
        'SELECT count(*),CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY-MM\') ELSE to_char(members.created_date, \'YYYY-MM\') END as created_date,active as activated FROM members';
      sql +=
        ' WHERE CASE WHEN (members.admin_action_date IS NOT NULL) THEN members.admin_action_date ELSE members.created_date END >= CURRENT_DATE - \'1 years\'::interval ';
      sql +=
        ' GROUP BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY-MM\') ELSE to_char(members.created_date, \'YYYY-MM\') END, active ';
      sql +=
        ' ORDER BY CASE WHEN (members.admin_action_date IS NOT NULL) THEN to_char(members.admin_action_date, \'YYYY-MM\') ELSE to_char(members.created_date, \'YYYY-MM\') END DESC';
    }

    const statistics = await client.query(sql);

    if (statistics.rowCount > 0) {
      resss = statistics.rows.reduce((group, a) => {
        let created_date = '';
        if (filter <= 3) {
          created_date = new Date(a.created_date);
          created_date.setDate(created_date.getDate());
          created_date = new Date(created_date).toISOString().split('T')[0];
        }
        if (filter === 4) {
          created_date = new Date(a.created_date).toISOString().split('T')[0];
          created_date =
            created_date.split('-')[0] + '-' + created_date.split('-')[1];
        }
        if (filter >= 5) {
          created_date = a.created_date;
        }
        group[created_date] = group[created_date] ?? [];
        group[created_date].push(a);
        return group;
      }, {});
    }

    if (filter <= 3) {
      while (myPastDate <= date) {
        let dt = new Date(myPastDate).toISOString().split('T')[0];
        const dta = [{ created_date: dt }];
        result[dt] = resss[dt] ? resss[dt] : dta;
        myPastDate.setDate(myPastDate.getDate() + 1);
      }
    }

    if (filter === 4) {
      for (let i = 1; i <= 12; i++) {
        const dd = new Date(year1 + '-' + i + '- 12')
          .toISOString()
          .split('T')[0];

        let created_date = dd.split('-')[0] + '-' + dd.split('-')[1];

        const dta = [{ created_date }];
        result[created_date] = resss[created_date] ? resss[created_date] : dta;
      }
      for (let i = 1; i <= 12; i++) {
        const dd = new Date(year2 + '-' + i + '- 12')
          .toISOString()
          .split('T')[0];
        let created_date = dd.split('-')[0] + '-' + dd.split('-')[1];
        const dta = [{ created_date: created_date }];
        result[created_date] = resss[created_date] ? resss[created_date] : dta;
      }
    }

    if (filter === 5) {
      if (statistics.rowCount === 4) {
        result = resss;
      } else {
        let todaydate = new Date();
        let oneJan = new Date(todaydate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor(
          (todaydate - oneJan) / (24 * 60 * 60 * 1000)
        );
        let weeknumberNow = Math.ceil((todaydate.getDay() + numberOfDays) / 7);

        let n = 0;
        for (weeknumberNow; weeknumberNow > n; n++) {
          let weeknumber = weeknumberNow - n;
          let minDays = n * 7;
          let day_n = new Date(todaydate);
          day_n.setDate(day_n.getDate() - minDays);
          if (n === 3) n = weeknumberNow;
          let created_date = '0' + (day_n.getMonth() + 1) + '-' + weeknumber;
          const dta = [{ created_date }];
          result[created_date] = resss[created_date]
            ? resss[created_date]
            : dta;
        }
      }
    }

    if (filter === 6) {
      myPastDate.setMonth(myPastDate.getMonth() + 1);
      for (let i = 1; i <= 12; i++) {
        myPastDate.setMonth(myPastDate.getMonth() - 1);
        let created_date = new Date(myPastDate).toISOString().split('T')[0];
        created_date =
          created_date.split('-')[0] + '-' + created_date.split('-')[1];
        const dta = [{ created_date: created_date }];
        result[created_date] = resss[created_date] ? resss[created_date] : dta;
      }
    }

    for (const currentValue in result) {
      let activated = 0;
      let non_activated = 0;

      for (let i = 0; i < result[currentValue].length; i++) {
        if (parseInt(result[currentValue][i].activated) > 0) {
          activated += parseInt(result[currentValue][i].count);
        } else {
          non_activated += parseInt(result[currentValue][i].count);
          non_activated = non_activated ? non_activated : 0;
        }
        // if (parseInt(result[currentValue][i].activated) === 0)
        // non_activated = parseInt(result[currentValue][i].count);
      }
      total_activated = Number(total_activated) + Number(activated);
      total_non_activated = Number(total_non_activated) + Number(non_activated);

      newRes = {
        created_at: currentValue,
        activated: parseInt(activated) > 0 ? parseInt(activated) : 0,
        non_activated: parseInt(non_activated) > 0 ? parseInt(non_activated) : 0
      };
      response = newRes !== '' ? [...response, newRes] : [...response];
    }

    let sql_total =
      'SELECT (SELECT count(*) from members where e_loop_status=1 and activated=1::bit) as total_all_activated, (SELECT count(*) from members where e_loop_status !=1 or activated !=1::bit or e_loop_status is NULL or activated is NULL) as total_all_non_activated';
    const statistics_total = await client.query(sql_total);
    const { total_all_activated, total_all_non_activated } = statistics_total.rows[0];

    if (filter < 5) {
      response.reverse();
    }

    let resp = {
      success: true,
      message: 'successfully',
      data: response,
      data_yoy: responseYOY,
      total_activated: total_activated,
      total_non_activated: total_non_activated,
      total_all_activated: total_all_activated && parseInt(total_all_activated) > 0 ? parseInt(total_all_activated) : 0,
      total_all_non_activated: total_all_non_activated && parseInt(total_all_non_activated) > 0 ? parseInt(total_all_non_activated) : 0
    };
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'data not found'
    });
  }
};

exports.redemptions = async (req, res) => {
  let date = new Date();
  let myPastDate = new Date(date);

  const { year1, year2 } = req.body;
  // const user_id = parseInt(req.body.user_id) > 0 ? parseInt(req.body.user_id) : 0;
  let filter = parseInt(req.body.filter) > 0 ? parseInt(req.body.filter) : 1;

  let result = [];
  let response = [];
  let responseYOY = [];
  let resss = [];
  let resssCnt = [];
  let newRes = '';
  let messages = [];
  if (filter === 4) {
    if (!year1) messages = [...messages, 'year1 required'];
    if (!year2) messages = [...messages, 'year2 required'];
  }
  //if (user_id <= 0) messages = [...messages, 'user_id required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }
  try {
    let sql = '';
    if (filter === 1) {
      sql =
        'SELECT count(*), to_char(created_at,\'YYYY-MM-DD\') as created_at, sum(point) as total_point FROM history_point_v WHERE type = 2 and is_verify = 1 and created_at >= CURRENT_DATE - \'6 days\'::interval group by to_char(created_at,\'YYYY-MM-DD\') ORDER BY to_char(created_at,\'YYYY-MM-DD\') DESC';
      myPastDate.setDate(myPastDate.getDate() - 6);
    }
    if (filter === 2) {
      sql =
        'SELECT count(*), to_char(created_at,\'YYYY-MM-DD\') as created_at, sum(point) as total_point FROM history_point_v WHERE type = 2 and is_verify = 1 and created_at >= CURRENT_DATE - \'13 days\'::interval group by to_char(created_at,\'YYYY-MM-DD\') ORDER BY to_char(created_at,\'YYYY-MM-DD\') DESC';
      myPastDate.setDate(myPastDate.getDate() - 13);
    }
    if (filter === 3) {
      sql =
        'SELECT count(*), to_char(created_at,\'YYYY-MM-DD\') as created_at, sum(point) as total_point FROM history_point_v WHERE type = 2 and is_verify = 1 and created_at >= CURRENT_DATE - \'29 days\'::interval group by to_char(created_at,\'YYYY-MM-DD\') ORDER BY to_char(created_at,\'YYYY-MM-DD\') DESC';
      myPastDate.setMonth(myPastDate.getMonth() - 1);
    }
    if (filter === 4) {
      sql =
        'SELECT count(*), to_char(created_at,\'YYYY-MM\') as created_at, sum(point) as total_point FROM history_point_v WHERE type = 2 and is_verify = 1 and date_part(\'year\', created_at) in(\'' +
        year1 +
        '\',\'' +
        year2 +
        '\') group by to_char(created_at,\'YYYY-MM\') ORDER BY to_char(created_at,\'YYYY-MM\') DESC';

      let sql2 =
        'SELECT sum(point) as total_point,count(*), date_part(\'year\',created_at) as created_at FROM history_point_v WHERE type = 2 and is_verify = 1 and date_part(\'year\', created_at) in(\'' +
        year1 +
        '\',\'' +
        year2 +
        '\') group by date_part(\'year\',created_at) ORDER BY date_part(\'year\',created_at) DESC';

      const statisticsYOY = await client.query(sql2);
      if (statisticsYOY.rowCount > 0) {
        resss = statisticsYOY.rows.reduce((group, a) => {
          const created_at = a.created_at;
          group[created_at] = group[created_at] ?? [];
          group[created_at].push(a);
          return group;
        }, {});
      }

      let newRess = {
        created_at: year1,
        points: 0,
        count: 0
      };
      const yoy = [year1, year2];
      for (let j = 0; j < 2; j++) {
        let points = 0;
        let count = 0;
        if (resss[yoy[j]]) {
          points = resss[yoy[j]][0].total_point;
          count = resss[yoy[j]][0].count;
        }

        newRess = {
          created_at: yoy[j],
          points: parseInt(points),
          count: parseInt(count)
        };

        responseYOY =
          newRess !== '' ? [...responseYOY, newRess] : [...responseYOY];
      }
    }

    if (filter === 5) {
      sql =
        'SELECT count(*),concat(to_char(created_at, \'MM\'),\'-\',date_part(\'week\', created_at)) AS created_at, sum(point) as total_point FROM history_point_v WHERE type = 2 and is_verify = 1 and created_at >= CURRENT_DATE - \'1 month\'::interval group by concat(to_char(created_at, \'MM\'),\'-\',date_part(\'week\', created_at)) ORDER BY concat(to_char(created_at, \'MM\'),\'-\',date_part(\'week\', created_at)) DESC Limit 4';
    }

    if (filter === 6) {
      sql =
        'SELECT count(*),to_char(created_at, \'YYYY-MM\') as created_at, sum(point) as total_point FROM history_point_v WHERE type = 2 and is_verify = 1 and created_at >= CURRENT_DATE - \'1 years\'::interval group by to_char(created_at, \'YYYY-MM\') ORDER BY to_char(created_at, \'YYYY-MM\') DESC';
    }

    const statistics = await client.query(sql);

    if (statistics.rowCount > 0) {
      resss = statistics.rows.reduce((group, a) => {
        let created_at = '';
        if (filter <= 3) {
          created_at = new Date(a.created_at);
          created_at.setDate(created_at.getDate());
          created_at = new Date(created_at).toISOString().split('T')[0];
        }
        if (filter === 4) {
          created_at = new Date(a.created_at).toISOString().split('T')[0];
          created_at =
            created_at.split('-')[0] + '-' + created_at.split('-')[1];
        }
        if (filter >= 5) {
          created_at = a.created_at;
        }
        group[created_at] = group[created_at] ?? [];
        group[created_at].push(a);
        return group;
      }, {});
    }

    if (filter <= 3) {
      while (myPastDate <= date) {
        let dt = new Date(myPastDate).toISOString().split('T')[0];
        const dta = [{ created_at: dt }];
        result[dt] = resss[dt] ? resss[dt] : dta;
        myPastDate.setDate(myPastDate.getDate() + 1);
      }
    }

    if (filter === 4) {
      for (let i = 1; i <= 12; i++) {
        const dd = new Date(year1 + '-' + i + '- 12')
          .toISOString()
          .split('T')[0];

        let created_at = dd.split('-')[0] + '-' + dd.split('-')[1];
        const dta = [{ created_at }];
        result[created_at] = resss[created_at] ? resss[created_at] : dta;
      }
      for (let i = 1; i <= 12; i++) {
        const dd = new Date(year2 + '-' + i + '- 12')
          .toISOString()
          .split('T')[0];
        let created_at = dd.split('-')[0] + '-' + dd.split('-')[1];
        const dta = [{ created_at: created_at }];
        result[created_at] = resss[created_at] ? resss[created_at] : dta;
      }
    }

    if (filter === 5) {
      if (statistics.rowCount === 4) {
        result = resss;
      } else {
        let todaydate = new Date();
        let oneJan = new Date(todaydate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor(
          (todaydate - oneJan) / (24 * 60 * 60 * 1000)
        );
        let weeknumberNow = Math.ceil((todaydate.getDay() + numberOfDays) / 7);

        let n = 0;
        for (weeknumberNow; weeknumberNow > n; n++) {
          let weeknumber = weeknumberNow - n;
          let minDays = n * 7;
          let day_n = new Date(todaydate);
          day_n.setDate(day_n.getDate() - minDays);
          if (n === 3) n = weeknumberNow;
          let created_at = '0' + (day_n.getMonth() + 1) + '-' + weeknumber;
          const dta = [{ created_at }];
          result[created_at] = resss[created_at] ? resss[created_at] : dta;
        }
      }
    }

    if (filter === 6) {
      myPastDate.setMonth(myPastDate.getMonth() + 1);
      for (let i = 1; i <= 12; i++) {
        myPastDate.setMonth(myPastDate.getMonth() - 1);
        let created_at = new Date(myPastDate).toISOString().split('T')[0];
        created_at = created_at.split('-')[0] + '-' + created_at.split('-')[1];
        const dta = [{ created_at: created_at }];
        result[created_at] = resss[created_at] ? resss[created_at] : dta;
      }
    }

    let total_count = 0;
    let total_point = 0;
    for (const currentValue in result) {
      newRes = {
        created_at: currentValue,
        count: result[currentValue][0].count
          ? parseInt(result[currentValue][0].count)
          : 0,
        points: result[currentValue][0].total_point
          ? parseInt(result[currentValue][0].total_point)
          : 0
      };
      total_count += result[currentValue][0].count
        ? parseInt(result[currentValue][0].count)
        : 0;
      total_point += result[currentValue][0].total_point
        ? parseInt(result[currentValue][0].total_point)
        : 0;
      response = newRes !== '' ? [...response, newRes] : [...response];
    }
    if (filter < 5) {
      response.reverse();
    }
    let total_point_cross_store = 0;
    if (cache.has('total_point_cross_store')) {
      total_point_cross_store = cache.get('total_point_cross_store');
    } else {
      let sql_cross_store =
        'SELECT sum(point) as total_point_cross_store FROM history_point_v WHERE is_home_dealership=0 and type = 2 and is_verify = 1';
      const {
        rows: [sql_total_cross_store]
      } = await client.query(sql_cross_store);
      total_point_cross_store = parseInt(sql_total_cross_store.total_point_cross_store) < 0 ? parseInt(sql_total_cross_store.total_point_cross_store) * -1 : parseInt(sql_total_cross_store.total_point_cross_store);
      cache.set('total_point_cross_store', total_point_cross_store);
      cache.set('last_update_point_cross_store', new Date());
    }
    const last_update_point_cross_store = cache.has('total_point_cross_store') ? cache.get('last_update_point_cross_store') : new Date();
    const {
      rows: [sql_total]
    } = await client.query(
      `SELECT count(*), sum(point) as total_all_point
       FROM history_point_v
       WHERE type = 2
         and is_verify = 1`
    );

    let resp = {
      success: true,
      message: 'successfully',
      data: response,
      data_yoy: responseYOY,
      total_count: parseInt(total_count),
      total_point: parseInt(total_point),
      total_point_cross_store: total_point_cross_store,
      last_update_point_cross_store: last_update_point_cross_store,
      total_all_count: parseInt(sql_total.count),
      total_all_point: parseInt(sql_total.total_all_point)
    };
    res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: 'data not found'
    });
  }
};

exports.transactionComparison = async (req, res) => {
  let resp = {
    success: true,
    message: 'menunggu data dari MARS'
  };
  res.status(200).json(resp);
};

exports.annualStoreReport = async (req, res) => {
  const { year } = req.body;
  let response = [];
  let messages = [];
  if (!year || year === '') messages = [...messages, 'year required'];
  if (messages.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'input validation',
      data: messages
    });
  }
  let total_accruals = 0;
  let total_redemptions = 0;
  let total_expired_points = 0;
  try {
    let sql = `select *
               from public.annual_store_reports_v
               where created_at = '${year}'
               order by total_point desc`;
    const statistics = await client.query(sql);
    for (let i = 0; i < statistics.rowCount; i++) {
      total_expired_points += Number(statistics.rows[i].point_expired);
      response[statistics.rows[i].about_dealership_id] = {
        about_dealership_id: statistics.rows[i].about_dealership_id,
        location: statistics.rows[i].location,
        dealer_name: statistics.rows[i].dealer_name,
        point_expired: 0,
        accruals: typeof (response[statistics.rows[i].about_dealership_id]) !== 'undefined' ? response[statistics.rows[i].about_dealership_id].accruals : 0,
        redemptions: typeof (response[statistics.rows[i].about_dealership_id]) !== 'undefined' ? response[statistics.rows[i].about_dealership_id].redemptions : 0
      };
      if (statistics.rows[i].type === 1 || statistics.rows[i].type === 4) {
        let accruals = Number(response[statistics.rows[i].about_dealership_id].accruals) + Number(statistics.rows[i].total_point);
        total_accruals += accruals;
        response[statistics.rows[i].about_dealership_id] = {
          ...response[statistics.rows[i].about_dealership_id],
          accruals: accruals
        };
      }
      if (statistics.rows[i].type === 2 || statistics.rows[i].type === 3) {
        let totalPoint = Number(statistics.rows[i].total_point);
        if (Number(statistics.rows[i].total_point > 0)) totalPoint = Number(statistics.rows[i].total_point) * -1;
        let redemptions = Number(response[statistics.rows[i].about_dealership_id].redemptions) + Number(totalPoint);
        total_redemptions += redemptions;
        response[statistics.rows[i].about_dealership_id] = {
          ...response[statistics.rows[i].about_dealership_id],
          redemptions: redemptions
        };
      }
      if (parseInt(statistics.rows[i].point_expired) > 0) {
        let point_expired = Number(response[statistics.rows[i].about_dealership_id].point_expired) + Number(statistics.rows[i].point_expired);
        response[statistics.rows[i].about_dealership_id] = {
          ...response[statistics.rows[i].about_dealership_id],
          point_expired: point_expired
        };
      }
    }

    let resp = {
      success: true,
      message: 'successfully',
      data: response,
      year: year,
      total_accruals: total_accruals,
      total_redemptions: total_redemptions * -1,
      total_expired_points: total_expired_points,
      total_points: Number(total_accruals) + Number(total_redemptions)
    };
    res.status(200).json(resp);
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: 'data not found'
    });
  }
};

exports.downloadAnnualStoreReport = async (req, res) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Accruals');
  const worksheet2 = workbook.addWorksheet('Redemptions');
  const worksheet3 = workbook.addWorksheet('Expired Points');
  let date = new Date();
  let yearNow = date.getFullYear();
  worksheet.getCell('A1').value = 'Accruals';
  worksheet2.getCell('A1').value = 'Redemptions';
  worksheet3.getCell('A1').value = 'Expired Points';
  let columns = ['Store'];

  for (let i = 2012; i <= yearNow; i++) {
    columns = [...columns, i];
  }
  columns = [...columns, 'Total'];
  worksheet.getRow(2).values = columns;
  worksheet2.getRow(2).values = columns;

  let sql = `select *
             from annual_store_reports_v
             order by total_point desc`;
  const statistics = await client.query(sql);
  let response = [];
  let total_expired_points = 0;
  for (let i = 0; i < statistics.rowCount; i++) {
    response[statistics.rows[i].about_dealership_id] = {
      ...response[statistics.rows[i].about_dealership_id],
      store: statistics.rows[i].location,
      point_expired: 0,
      accruals: typeof (response[statistics.rows[i].about_dealership_id]) !== 'undefined' ? Number(response[statistics.rows[i].about_dealership_id].accruals) : 0,
      redemptions: typeof (response[statistics.rows[i].about_dealership_id]) !== 'undefined' ? Number(response[statistics.rows[i].about_dealership_id].redemptions) : 0
    };
    if (statistics.rows[i].type === 1 || statistics.rows[i].type === 4) {
      let accruals = Number(response[statistics.rows[i].about_dealership_id].accruals) + Number(statistics.rows[i].total_point);
      response[statistics.rows[i].about_dealership_id] = {
        ...response[statistics.rows[i].about_dealership_id],
        [statistics.rows[i].created_at + '_accruals']: accruals
      };
    }
    if (statistics.rows[i].type === 2 || statistics.rows[i].type === 3) {
      let totalPoint = Number(statistics.rows[i].total_point);
      if (Number(statistics.rows[i].total_point < 0)) totalPoint = Number(statistics.rows[i].total_point) * -1;
      let redemptions = Number(response[statistics.rows[i].about_dealership_id].redemptions) + Number(totalPoint);
      response[statistics.rows[i].about_dealership_id] = {
        ...response[statistics.rows[i].about_dealership_id],
        [statistics.rows[i].created_at + '_redemptions']: redemptions
      };
    }
    if (parseInt(statistics.rows[i].point_expired) > 0) {
      let point_expired = Number(response[statistics.rows[i].about_dealership_id].point_expired) + Number(statistics.rows[i].point_expired);
      total_expired_points += Number(statistics.rows[i].point_expired);
      response[statistics.rows[i].about_dealership_id] = {
        ...response[statistics.rows[i].about_dealership_id],
        [statistics.rows[i].created_at + '_point_expired']: point_expired
      };
    }
  }
  if (parseInt(total_expired_points) > 0) {
    worksheet3.getRow(2).values = columns;
  } else {
    worksheet3.getRow(2).values = ['Store', 'Total'];
  }
  let keys = [{ key: 'store', width: 60 }];
  let key_redemptions = [{ key: 'store', width: 60 }];
  let key_point_expired = [{ key: 'store', width: 60 }];
  for (let i = 2012; i <= yearNow; i++) {
    keys = [...keys, { key: i + '_accruals', width: 15 }];
    key_redemptions = [...key_redemptions, { key: i + '_redemptions', width: 15 }];
    key_point_expired = [...key_point_expired, { key: i + '_point_expired', width: 15 }];
  }
  keys = [...keys, { key: 'totals', width: 20 }];
  key_redemptions = [...key_redemptions, { key: 'totals', width: 20 }];
  key_point_expired = [...key_point_expired, { key: 'totals', width: 20 }];
  worksheet.columns = keys;
  worksheet2.columns = key_redemptions;
  worksheet3.columns = key_point_expired;

  response.forEach((result) => {
    if (result.store) {
      worksheet.addRow(result);
      worksheet2.addRow(result);
      worksheet3.addRow(result);
    }
  });
  const endRow = worksheet.lastRow._number + 1;
  const endColumn = worksheet.lastColumn.number - 2;

  const endRow2 = worksheet2.lastRow._number + 1;
  const endRow3 = worksheet3.lastRow._number + 1;

  for (let i = 1; i < columns.length - 1; i++) {
    let columnSUm = String.fromCharCode('A'.charCodeAt(0) + Number(i));
    let total = { formula: `SUM(${columnSUm}3:${columnSUm}${endRow - 1})` };
    worksheet.getCell(`${columnSUm}${endRow}`).value = total !== 0 ? total : '';
    worksheet.getCell(`${columnSUm}${endRow}`).numFmt = '#,##0';
    worksheet.getCell(`${columnSUm}${endRow}`).font = { bold: true };

    total = { formula: `SUM(${columnSUm}3:${columnSUm}${endRow2 - 1})` };
    worksheet2.getCell(`${columnSUm}${endRow2}`).value = total !== 0 ? total : '';
    worksheet2.getCell(`${columnSUm}${endRow2}`).numFmt = '#,##0';
    worksheet2.getCell(`${columnSUm}${endRow2}`).font = { bold: true };

    if (parseInt(total_expired_points) > 0) {
      total = { formula: `SUM(${columnSUm}3:${columnSUm}${endRow3 - 1})` };
      worksheet3.getCell(`${columnSUm}${endRow3}`).value = total !== 0 ? total : '';
      worksheet3.getCell(`${columnSUm}${endRow3}`).numFmt = '#,##0';
      worksheet3.getCell(`${columnSUm}${endRow3}`).font = { bold: true };
    }
  }

  let columnSUm = String.fromCharCode('A'.charCodeAt(0) + Number(endColumn));
  worksheet.lastColumn.eachCell((cell) => {
    if (cell.row > 2) {
      let total = { formula: `SUM(B${cell.row}:${columnSUm}${cell.row})` };
      cell.value = total !== 0 ? total : '';
      cell.numFmt = '#,##0';
      cell.font = { bold: true };
    }
    cell.alignment = { horizontal: 'right' };
  });

  worksheet2.lastColumn.eachCell((cell) => {
    if (cell.row > 2) {
      let total = { formula: `SUM(B${cell.row}:${columnSUm}${cell.row})` };
      cell.value = total !== 0 ? total : '';
      cell.numFmt = '#,##0';
      cell.font = { bold: true };
    }
    cell.alignment = { horizontal: 'right' };
  });


  worksheet3.lastColumn.eachCell((cell) => {
    if (parseInt(total_expired_points) > 0) {
      if (cell.row > 2) {
        let total = { formula: `SUM(B${cell.row}:${columnSUm}${cell.row})` };
        cell.value = total !== 0 ? total : '';
        cell.numFmt = '#,##0';
        cell.font = { bold: true };
      }
    }
    cell.alignment = { horizontal: 'right' };
  });


  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, size: 14 };
  });

  worksheet2.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, size: 14 };
  });

  worksheet3.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, size: 14 };
  });

  for (let n = 3; n <= endRow; n++) {
    worksheet.getRow(n).eachCell((cell) => {
      if (cell > 1) {
        cell.alignment = { horizontal: 'right' };
        cell.numFmt = '#,##0';
      }
    });
    worksheet2.getRow(n).eachCell((cell) => {
      if (cell > 1) {
        cell.alignment = { horizontal: 'right' };
        cell.numFmt = '#,##0';
      }
    });
    worksheet3.getRow(n).eachCell((cell) => {
      if (cell > 1) {
        cell.alignment = { horizontal: 'right' };
        cell.numFmt = '#,##0';
      }
    });
  }
  worksheet.getRow(2).eachCell((cell) => {
    cell.font = { bold: true };
  });
  worksheet2.getRow(2).eachCell((cell) => {
    cell.font = { bold: true };
  });
  worksheet3.getRow(2).eachCell((cell) => {
    cell.font = { bold: true };
  });

  try {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', `attachment; filename=OpenRoadAccrualsRedemptionsExpirationByStore.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200);
    });


  } catch (err) {
    res.send({
      status: 'error',
      message: 'Something went wrong'
    });
  }
};

