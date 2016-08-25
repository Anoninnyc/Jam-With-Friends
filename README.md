# tbd

## Deployment

#### Prepare a source bundle

* run `bash scripts/archive.sh`
* then upload it to AWS

#### Prepare environment

* ssh into AWS
* as a sudo user, `cd` into the path of deployed files. Then run:
  * `bash scripts/install.sh`
  * `bash scripts/start.sh`
