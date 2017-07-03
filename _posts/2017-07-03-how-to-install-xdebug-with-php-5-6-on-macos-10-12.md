---
layout: post
published: false
title: How to install XDebug with PHP 5.6 on MacOS 10.12
---
Mostly writing this up for my own reference (because I'll undoubtedly have to do this again at some point), but hope it might be helpful to others out there.

First, install HomeBrew:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Use HomeBrew to install autoconf and XDebug:
```
brew tap homebrew/homebrew-php
brew install autoconf
brew install php56-xdebug
```

Optionally, install xdebug-osx to enable toggling of XDebug:
```
brew install xdebug-osx
```

Next, update your php.ini file with these lines:
```
[Xdebug]
zend_extension="/usr/lib/php/extensions/no-debug-non-zts-20131226/xdebug.so"
xdebug.remote_enable=1
xdebug.profiler_enable=1
xdebug.profiler_output_dir="<AMP home\tmp>"
```

You should be good to go now. You can confirm by checking your config with the [XDebug Config Checker](https://xdebug.org/wizard.php).

## Reference:

* [https://stackoverflow.com/questions/36886982/mac-os-el-capitan-10-11-install-xdebug](https://stackoverflow.com/questions/36886982/mac-os-el-capitan-10-11-install-xdebug)