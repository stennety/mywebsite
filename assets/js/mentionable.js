import { html, Component, render } from './bundle.js';

function numberIntl(count) {
  return 'Intl' in window ? new Intl.NumberFormat().format(count) : Number(count)
}

// <Mentioncount/>
function Mentioncount(props) {
  return html`<span>(${ numberIntl(props.count) })</span>`;
}

// Check author.name, fallback to using host name instead...
function mentionname(name, url) {
    return name ? name : new URL(url).host;
}

// Check published, fallback to webmention.io received date...
function mentiondate(published, wmreceived) {
    return new Date(published ? published : wmreceived).toLocaleString();
}

// Check url, fallback to author url...
function mentionurl(url, authorurl) {
    return new URL(url ? url : authorurl).host;
}

// <Mentionslist/>
function Mentionslist(props) {
  let mentions = props.mentions;
  if (!props.mentions.length) return null;
  return html`
  <ul>
    ${mentions.map((
      {
        url, 
        published,
        author: {
        name: authorname, 
        url: authorurl
        },
        content: {
            text
        },
        'wm-property': wmproperty,
        'wm-received': wmreceived
      } = mention) => {return html`
    <li>
      <p class="${wmproperty}">
          <a href="${mentionurl(url, authorurl)}" rel="nofollow ugc">${mentionname(authorname, url)}</a> (${url}), <time datetime="${published || wmreceived}">${mentiondate(published, wmreceived)}</time> - ${text}
      </p>
    </li>
    `})}
  </ul>
  `;
}

// <Mentionsmessage/>
function Mentionmessage(props) {
  if (!props.msg) return null;
  return html`<p role="alert">${props.msg}</p>`;
}

// <Mentionable/>
class Mentionable extends Component {
    
  constructor(props) {
    super(props);
    this.fetchNow = (ev) => {
      ev.preventDefault();
      this._fetchMentions();
      this.setState({lazyload: false});
    }
    this.state = {
      lazyload: false,
      mentioncount: 0,
      msg: "",
      mentions: []      
    };
  }

  componentDidMount() {
    if (this.state.lazyload || this.isDatasaving()) {
      this._fetchCount().then(() => {
        if (this.state.mentioncount) {
          this.setState({msg: `Load ${this.state.mentioncount} webmentions?`});
          document.querySelector('#mentions').setAttribute('aria-live', 'polite');
          document.querySelector('#mentions').setAttribute('aria-atomic', 'true');
        } else {
          this.setState({msg: "Sorry, 0 webmentions found"});
        }
      });
    } else {
        this.setState({msg: "Loading..."})
        this._fetchMentions();
    }
  }

  componentWillUnmount() {
  }

  isDatasaving() {
    try {
      return window.matchMedia('(prefers-reduced-data:reduce)').matches;
    } catch(err) {
      return false;
    }
  }

  async _fetchCount() {
    return await fetch(`https://webmention.io/api/count?target=${ encodeURIComponent(window.location.href) }`).then(
      response => response.json()
    ).then(
      data => {
          this.setState({mentioncount: data.count});
          console.log(this.state.mentioncount);
        }
    ).catch(error => {
      console.warn("Request failed", error);
      this.setState({msg: "Sorry, an error fetching webmentions"});
    });
  }

  async _fetchMentions() {
    return await fetch(`https://webmention.io/api/mentions.jf2?target=${ encodeURIComponent(window.location.href) }`).then(
      response => response.json()
    ).then(
      data => {
        if (data.children.length !== 0) {
          this.setState({mentioncount: data.children.length});
          this.setState({mentions: data.children});
          this.setState({msg: ""});
        } else {
          this.setState({mentioncount: 0});
          this.setState({msg: "Sorry, no webmentions"});
        }
      }
    ).catch(error => {
      console.warn("Request failed", error);
      this.setState({msg: "Sorry, an error fetching webmentions"});
    });
  }
  
  render() {
    return html`
      <section>
        <h2 id="webmentions">Webmentions <${Mentioncount} count=${this.state.mentioncount} /></h2>
        <div id="mentions">
          <${Mentionslist} mentions=${this.state.mentions} />
          <${Mentionmessage} msg=${this.state.msg} />
        </div>
        ${this.state.lazyload ? 
          html`<input class="button" type="button" value="Load Webmentions" aria-controls="mentions" onClick=${this.fetchNow} />` : ``
        }
      </section>
    `
  }

}

render(html`<${Mentionable} />`, document.querySelector('#mentionable'));