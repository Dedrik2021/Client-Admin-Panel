import React, { Component } from 'react';

export default class EditorMeta extends Component {
	constructor(props) {
		super(props);
		this.state = {
			meta: {
				title: '',
				keywords: '',
				descr: '',
			},
		};
	}

	componentDidMount() {
		this.getMeta(this.props.virtualDom);
	}

    componentDidUpdate(prevProps) {
        if (this.props.virtualDom !== prevProps.virtualDom) {
            this.getMeta(this.props.virtualDom)
        }
    }

	getMeta(virtualDom) {
		this.title =
			virtualDom.head.querySelector('title') || virtualDom.head.appendChild(virtualDom.createElement('title'));

		this.keywords = virtualDom.head.querySelector('meta[name="keywords"]');
		if (!this.keywords) {
			this.keywords = virtualDom.head.appendChild(virtualDom.createElement('meta'));
			this.keywords.setAttribute('name', 'keywords');
			this.keywords.setAttribute('content', '');
		}

		this.descr = virtualDom.head.querySelector('meta[name="descr"]');
		if (!this.descr) {
			this.descr = virtualDom.head.appendChild(virtualDom.createElement('meta'));
			this.descr.setAttribute('name', 'descr');
			this.descr.setAttribute('content', '');
		}

		this.setState({
			meta: {
				title: this.title.innerHTML,
				keywords: this.keywords.getAttribute('content'),
				descr: this.descr.getAttribute('content'),
			},
		});
	}

	applyMeta() {
		this.title.innerHTML = this.state.meta.title;
		this.keywords.setAttribute('content', this.state.meta.keywords);
		this.descr.setAttribute('content', this.state.meta.descr);
	}

    onValueChange(e) {

        if (e.target.getAttribute('data-title')) {
            e.persist()
            this.setState(({meta}) => {
                const newMeta = {
                    ...meta,
                    title: e.target.value
                }
                return {
                    meta: newMeta
                }
            })
        } else if (e.target.getAttribute('data-key')) {
            e.persist()
            this.setState(({meta}) => {
                const newMeta = {
                    ...meta,
                    keywords: e.target.value
                }
                return {
                    meta: newMeta
                }
            })
        } else  {
            e.persist()
            this.setState(({meta}) => {
                const newMeta = {
                    ...meta,
                    descr: e.target.value
                }
                return {
                    meta: newMeta
                }
            })
        }

    }

	render() {
		const { modal, target } = this.props;
		const { title, keywords, descr } = this.state.meta;

		return (
			<div id={target} uk-modal={modal.toString()}>
				<div className="uk-modal-dialog uk-modal-body">
					<h2 className="uk-modal-title">Editing Meta tags</h2>

					<form>
						<div className="uk-margin">
							<input 
                                data-title
                                className="uk-input"
                                type="text" placeholder="Title"
                                value={title}
                                onChange={(e) => this.onValueChange(e)}/>
						</div>

						<div className="uk-margin">
							<textarea
                                data-key
								className="uk-textarea"
								rows="5"
								placeholder="Keywords"
								value={keywords}
                                onChange={(e) => this.onValueChange(e)}
							></textarea>
						</div>

						<div className="uk-margin">
							<textarea
                                data-descr
								className="uk-textarea"
								rows="5"
								placeholder="Description"
								value={descr}
                                onChange={(e) => this.onValueChange(e)}
							></textarea>
						</div>
					</form>

					<p className="uk-text-right">
						<button
							className="uk-button uk-margin-small-right uk-button-default uk-modal-close"
							type="button"
						>
							Cancel
						</button>
						<button
							onClick={() => this.applyMeta()}
							className="uk-button uk-button-primary uk-modal-close"
							type="button"
						>
							Apply
						</button>
					</p>
				</div>
			</div>
		);
	}
}
