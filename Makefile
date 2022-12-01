bootstrap:	modules
	@$(MAKE)	\
		build-hooks	\
		build-icons

modules:
	yarn install

build-hooks:
	yarn build:hook

build-icons:
	yarn build:icon
