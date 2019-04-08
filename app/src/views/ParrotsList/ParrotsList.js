import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { deleteParrot } from 'sagas/parrots/deleteParrot';
import withView from 'decorators/withView';
import { loginRequired } from 'decorators/permissions';
import { gettext } from 'utils/i18n';
import Bird from 'components/Bird';
import './ParrotsList.scss';
import Search from '../../components/Search';

const ParrotsList = ({ onDeleteFolder, parrots }) => {
    const [search, setSearch] = useState('');

    return (
        <Container>
            <h1 className="my-5">{gettext('Here are your parrots!')}</h1>
            <div className="mb-4">
                <Link to="/parrots/create">
                    <span className="btn btn-outline-success">
                        {gettext('New Parrot')}
                    </span>
                </Link>
            </div>
            <div className="my-3">
                <Search />
                <input
                    type="text"
                    className="parrot-search ml-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div>
                {parrots
                    .filter((parrot) => parrot.name.includes(search))
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((parrot) => (
                        <div className="parrot-card" key={parrot.id}>
                            <div className="parrot-card-left">
                                <div className="parrot-portrait">
                                    <Bird />
                                </div>
                                <div className="parrot-name ml-3">
                                    <a href={parrot.link}>{parrot.name}</a>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-outline-info mr-3">
                                    {gettext('Edit')}
                                </button>
                                <button onClick={() => onDeleteFolder(parrot.id)} className="btn btn-outline-danger">
                                    {gettext('Delete')}
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    parrots: state.parrots.parrots,
});

const mapDispatchToProps = (dispatch) => ({
    onDeleteFolder: (id) => dispatch(deleteParrot(id)),
});

const ParrotsListConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ParrotsList);

export default withView()(loginRequired()(ParrotsListConnector));
