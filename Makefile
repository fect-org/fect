bootstrap:	modules
	@$(MAKE)	\
		build-shared	\
		build-hooks	\
		build-scale	\
		build-icons	\

modules:
	yarn	install


build-shared:
	yarn	build:shared

build-hooks:
	yarn build:hook


build-scale:
	yarn	build:scale

build-icons:
	yarn	build:icon

build-lib:
	yarn	build:core