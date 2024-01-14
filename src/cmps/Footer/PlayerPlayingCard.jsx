import { useSelector } from "react-redux";
import { updateUser } from "../../store/actions/user.actions";
import { useEffect, useState } from "react";
import { LikeCard } from "../main/LikeCard";


export function PlayerPlayingCard() {


    const song = useSelector(storeState => storeState.songMoudle.currSong)
    const user = useSelector(storeState => storeState.userMoudle.userObj)

    return (
        <div className="playing-card" >
            <img src={`${song.imgUrl}`}></img>
            <div className="playing-card-info">
                <header>{song.title}</header>
                <p>{song.artist}</p>
            </div>
            <LikeCard item={song}></LikeCard>
        </div>

    )
}