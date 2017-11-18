# -*- coding: utf-8 -*-
from fabric.api import local,cd,run, env
from contextlib import contextmanager
from fabric.api import prefix
from fabric.api import roles

# env.hosts=['hg@123.56.4.42:22',] #ssh要用到的参数
env.password = ''
env.roledefs = {
    'production': ['ella@47.94.84.181'],
    # 'test': ['ella@47.94.84.181']
}
# env.warn_only = True


@contextmanager
def virtualenv():
    with prefix("workon flappy_bird"):
        yield


@roles('production')
def dt(version=''):
    with virtualenv():
        run("git pull")
        run("rm -rf ~/games/flappybird/*")
        print ('version=%s' % version)
        run("cp -rf bin-release/web/%s/* ~/games/flappybird/." % version)
        # run("pip install -r requirements.txt")
        run("sudo supervisorctl restart flappy_bird")
