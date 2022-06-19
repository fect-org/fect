bootstrap:	modules
	@$(MAKE)	\
		build-hooks	\
		build-icons

modules:
	yarn install

build-hooks:
	cd	packages/vue-hooks;	yarn	build

build-icons:
	cd	packages/vue-icons;	yarn build
