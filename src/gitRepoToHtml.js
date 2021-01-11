const fs = require('fs');
const { join, basename } = require('path');

const {uniq} = require('lodash');

const Handlebars = require("handlebars");
const dayjs = require('dayjs')
const calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

const simpleGit = require('simple-git');

async function gitRepoToHtml({path}) {

  const template = Handlebars.compile(
    fs.readFileSync(
      join(__dirname, 'templates/report.handlebars')
    ).toString()
  );

  const git = simpleGit(path);

  const gitLogs = (await git.log()).all.map(log => {
    log.hash = 	log.hash.substr(0,10)
    log.hrd = dayjs(log.date.toString()).calendar();
    log.ymd = dayjs(log.date.toString()).format('YYYY-MM-DD');
    return log;
  });

  const logdays = uniq(
    gitLogs.map(log => log.ymd)
  );
  const logs = [];

  for(let day of logdays) {
    logs.push({
        day: day,
        days_logs: gitLogs.filter(l => l.ymd === day)
    });
  }

  const repoName = basename(await git.revparse({'--show-toplevel': true})).toString();

  const html = template({
    repoName,
    logs
  });

  return Promise.resolve(html)
}

module.exports = {gitRepoToHtml};
