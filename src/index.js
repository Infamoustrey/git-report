const fs = require('fs');
const { join } = require('path')
const {Command, flags} = require('@oclif/command');

const Handlebars = require("handlebars");

const {htmlToPdf} = require('./htmlToPdf')

class GitReportCommand extends Command {

  static args = [
    {
      name: 'path',
      required: false,
      description: 'Path to the repository you wish to report on.',
      default: '.'
    },
    {
      name: 'out',
      required: false,
      description: 'Output path.',
      default: 'out.pdf'
    }
  ];

  async run() {
    const {args} = this.parse(GitReportCommand)

    const template = Handlebars.compile(
      fs.readFileSync(
        join(__dirname, 'templates/report.handlebars')
      ).toString()
    );

    const html = template({});

    const pdfBuffer = await htmlToPdf(html);

    fs.writeFileSync('out.pdf', pdfBuffer);

  }
}

GitReportCommand.description = `A CLI Tool for Generating PDF Reports from Git Logs

USAGE
  $ git-report [PATH] [OUT]

OPTIONS
  -v, --version prints the version of the program
  -h, --help  prints this help page
  -f, --force
  -n, --name=name  name to print
`

GitReportCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'})
}

module.exports = GitReportCommand
