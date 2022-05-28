bootstrap:	modules
	@$(MAKE)	\
		build-cli	\
		clean-all	\
		build-hooks	\
		build-icons
	

modules:
	yarn install

build-cli:
	cd	packages/cli;	yarn	build

clean-all:
	yarn	clean; yarn	

build-hooks:
	cd	packages/vue-hooks;	yarn	build

build-icons:
	cd	packages/vue-icons;	yarn build
