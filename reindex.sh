#!/bin/bash

#source /home/rails/.bashrc

[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
export RAILS_ENV="production"

cd /var/www/github/gripebox.com/ && rake ts:reindex
