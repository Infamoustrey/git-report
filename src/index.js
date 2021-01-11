const {Command, flags} = require('@oclif/command')

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
