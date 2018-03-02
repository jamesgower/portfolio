import React from 'react';
import NavBar from './NavBar';

class WikipediaAPI extends React.Component {

	render() {
		$(document).ready(() => {
			$('#searchinput').hide();
			$('#searchBtn').click(() => {
				$('#searchBtn').hide();
				$('#searchclear').fadeIn(1000);
				$('#searchinput').show();
				$('#searchinput').animate({
					marginLeft: '0%',
					width: '100%',
				});
			});
			$('#searchinput').keyup(() => {
				$('#searchclear').toggle(Boolean($(this).val()));
			});
			$('#searchclear').toggle(Boolean($('#searchinput').val()));
			$('#searchclear').click(() => {
				$('#searchinput')
					.val('')
					.focus();
				$('#searchclear').hide();
				$('#searchinput').animate({
					marginLeft: '45%',
					width: '0px',
				});
				$('#searchBtn')
					.delay(100)
					.fadeIn(800);
			});
			$('.article').hide();

			$('#searchinput').keypress((e) => {
				var inputStr = document.getElementById('searchinput').value;

				if (e.which == 13) {
					$('.contain').animate(
						{
							marginTop: '0px',
							height: '140px',
						},
						1000
					);
					$('#searchTxt').remove();

					var url =
						'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=' +
						inputStr +
						'&srlimit=10';

					$.ajax({
						url: url,
						dataType: 'jsonp',
						success: (data) => {
							if (data.query.searchinfo.totalhits === 0) {
								$('#article0').append(
									'<p id="title-wiki">No such match</p><p id="extract">Sorry, there are no matches to display</p>'
								);
								$('#article0').fadeIn(2000);
							}
							for (var i = 0; i < 10; i++) {
								getInfo(data.query.search[i].pageid, i);
							}
						},
					});
				}
			});

			function getInfo(pageId, i) {
				var url =
					'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&exsentences=4&pageids=' +
					pageId;
				$.ajax({
					url: url,
					dataType: 'jsonp',
					success: (data) => {
						var pageid = Object.keys(data.query.pages)[0];
						var title = data.query.pages[pageid].title;
						var extract = data.query.pages[pageid].extract;
						$('#article' + i).empty();
						$('#article' + i).hide();
						$('#article' + i).append(
							'<p id="title-wiki">' + title + '</p><p id="extract">' + extract + '</p>'
						);
						$('#article' + i).fadeIn(2000);
						$('#article' + i).append(
							'<a href = "https://en.wikipedia.org/wiki/' + title.replaceAll(' ', '%20') + '"></a>'
						);
						$('#article' + i).click(() => {
							if ($(this).find('a').length) {
								window.location.href = $(this)
									.find('a:first')
									.attr('href');
							}
						});
					},
				});
			}
		});

		String.prototype.replaceAll = (search, replace) => {
			if (replace === undefined) {
				return this.toString();
			}
			return this.split(search).join(replace);
		};

		return (
			<div id="wiki">
				<NavBar update={this.updateState} {...this.state} />
				<div className="wiki-container">
					<div className="contain">
						<div className="btn-group">
							<p className="text-wiki" id="randomLink">
								<a href="https://en.wikipedia.org/wiki/Special:Random">
									Click <b>here</b> for a random article
								</a>
							</p>
							<div className="search-container">
								<input id="searchinput" type="search" placeholder="Search..." />
								<img
									id="searchBtn"
									src="https://www.thesecu.com/wp-content/themes/secu/assets/images/Apps-Search-icon.png"
								/>
								<span id="searchclear">
									{' '}
									<i className="fa fa-times-circle" />{' '}
								</span>
							</div>
							<p className="text-wiki" id="searchTxt">
								<br />
								<br />Or click the search button to search for a particular article.
							</p>
						</div>
					</div>
					<div id="searchResults">
						<div className="article" id="article0" />
						<div className="article" id="article1" />
						<div className="article" id="article2" />
						<div className="article" id="article3" />
						<div className="article" id="article4" />
						<div className="article" id="article5" />
						<div className="article" id="article6" />
						<div className="article" id="article7" />
						<div className="article" id="article8" />
						<div className="article" id="article9" />
						<div className="article" id="article10" />
					</div>
				</div>
			</div>
		);
	}
}

export default WikipediaAPI;
