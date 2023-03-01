install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test-verbose:
	NODE_OPTIONS=--experimental-vm-modules npx jest --verbose
test-watch:
	NODE_OPTIONS=--experimental-vm-modules npx jest --watch
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage