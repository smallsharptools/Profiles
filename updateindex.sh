#!/bin/sh

# prevent files with private keys from being committed and pushed

git update-index --assume-unchanged Parse/config/global.json
git update-index --assume-unchanged iOS/Profiles/PRConstants.h

