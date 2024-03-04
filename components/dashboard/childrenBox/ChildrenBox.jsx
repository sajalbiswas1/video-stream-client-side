import React from 'react';
import HeaderChildren from './HeaderChildren/HeaderChildren';
import BodyChildren from './BodyChildren/BodyChildren';

const ChildrenBox = ({ dbutton, tableData,onDelete,onCurrentVisibleStatus ,searchQuery,setSearchQuery,  fetchEpisodes, fetchMovies,fetchShows}) => {
    return (
        <div className="bg-slate-900  p-3  rounded-lg min-h-screen">
            <HeaderChildren dbutton={dbutton}   fetchEpisodes={fetchEpisodes}  fetchMovies={fetchMovies} fetchShows={fetchShows} />
            <BodyChildren searchQuery={searchQuery} setSearchQuery={setSearchQuery} tableData={tableData} onDelete={onDelete} onCurrentVisibleStatus={onCurrentVisibleStatus}  />
        </div>
    );
};

export default ChildrenBox;