import React, {useEffect, useState} from 'react';
import './encounters.css';
import Action from "./components/action";
import {encounter} from "../../../../api/memberApi";
import Image from "./components/image";
import Info from "./components/info";
import {likeMember} from "../../../../api/actionApi";
import {useSelector} from "react-redux";

const Index = () => {
    const [data, setData] = useState({
        member: {},
        images: []
    })
    const filter = useSelector(state => state.filter);

    useEffect(() => {
        getData();
    }, [filter])

    const like = async () => {
        let formData = {
            memberId: data.member._id
        }
        await likeMember(formData).then(res => {
            getData(data.member._id);
        })
    }

    const skip = async () => {
        await getData(data.member._id);
    }

    const getData = async (notMember = null) => {
        let formData = [];
        if (notMember != null) {
             formData = [notMember]
        }
        await encounter(formData).then(res => {
            setData({member: res.data.member, images: res.data.images});
        })
    }

    return (
        <div className="encouter-page">
            <div className="card photo">
                <div className="row">
                    <Image images={data.images} avatar={data.member?.avatar}/>
                    <Info member={data.member}/>
                </div>
            </div>

            <Action like={() => like} skip={() => skip}/>
        </div>
    );
};

export default Index;
