bootstrap:	modules
	@$(MAKE)	\
		build-hooks	\
		build-icons	\
		build-shared

modules:
	yarn	install

build-hooks:
	yarn build:hook

build-shared:
	yarn	build:shared

build-scale:
	yarn	build:sclae

build-icons:
	yarn	build:icon

build-lib:
	yarn	build:lib