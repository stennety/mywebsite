stop:
	docker stop -t 30 jekyll || true
	docker rename jekyll jekyllStopped || true

local: stop
	rm -rf ./_site
	rm -rf Gemfile.lock
	rm -rf .jekyll-metadata
	docker run -d --rm --platform linux/amd64 -v $(PWD):/srv/jekyll -e DEBUG=true --publish [::1]:4000:4000 -p 4000:4000 --name jekyll jekyll/jekyll jekyll serve --watch --drafts --force_polling
