import React from 'react';

const ChooseModal = ({ modal, target, data, redirect }) => {

    const list = data.map((item) => {

        if (item.time) {

            return (
                <li key={item.file}>
                    <a 
                        className="uk-link-muted uk-modal-close"
                        href='#'
                        onClick={(e) => redirect(e, item.file)}> 
                        Backup from - {item.time}
                    </a>
                </li>
            )

        } else {

            return (
                <li key={item}>
                    <a 
                        className="uk-link-muted uk-modal-close"
                        href='#'
                        onClick={(e) => redirect(e, item)}> 
                        {item}
                    </a>
                </li>
            )
        }
    })

    let msg;
    if (data.length < 1) {
        msg = <div>No backups found!!!</div>
    }

    const modalName = () => {
        if (target == 'modal-open') {
            return 'Open'
        } else if (target == 'modal-backup') {
            return 'Restore'
        }
    }

	return (
		<div id={target} uk-modal={modal.toString()}>
			<div className="uk-modal-dialog uk-modal-body">
				<h2 className="uk-modal-title">{modalName()}</h2>
                {msg}
				<ul className="uk-list uk-list-divider">
					{list}
				</ul>
				<p className="uk-text-right">
					<button className="uk-button uk-button-default uk-modal-close" type="button">
						Cancel
					</button>
				</p>
			</div>
		</div>
	);
};

export default ChooseModal;
