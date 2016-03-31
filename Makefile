.PHONY: help run install update gulp

GULP = "node_modules/gulp/bin/gulp.js"

help:
	@echo "Usage: make [COMMAND]"
	@echo "  help       shows this text"
	@echo "  install    installs the npm and bower dependencies"
	@echo "  watch      watches of any changes happening in src/"
	@echo "  update     updates the npm and bower dependencies"
	@echo "  icons      copies all the icons to static/fonts"
	@echo "  images     optimizes all images in src/imgs and copies them to static/imgs"
	@echo "  sass       compiles all the scss files to one css files"
	@echo "  scripts    concates all js files to one js file"


watch:
	${GULP} watch

install:
	npm install
	${GULP} bower

update:
	npm update
	${GULP} update

icons:
	${GULP} icons

images:
	${GULP} images

sass:
	${GULP} sass

scripts:
	${GULP} scroüts
