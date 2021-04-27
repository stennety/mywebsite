local:
	rm -rf ./_site
	rm -rf Gemfile.lock
	rm -rf .jekyll-metadata
	docker run -it --rm -v $(PWD):/srv/jekyll -p "4000:4000" jekyll/jekyll:pages "jekyll serve --watch --incremental"