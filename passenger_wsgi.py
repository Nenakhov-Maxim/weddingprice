import sys

import os

INTERP = os.path.expanduser("/var/www/u0000005/data/flaskenvnew/bin/python")
if sys.executable != INTERP:
   os.execl(INTERP, INTERP, *sys.argv)

sys.path.append(os.getcwd())

