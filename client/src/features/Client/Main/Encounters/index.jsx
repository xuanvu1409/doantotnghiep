import React, {useEffect, useState} from 'react';
import './encounters.css';
import Action from "./components/action";
import {encounter} from "../../../../api/memberApi";
import Image from "./components/image";
import Info from "./components/info";
import {likeMember} from "../../../../api/actionApi";
import {useSelector} from "react-redux";
import Loading from "../../../../components/Share/loading";
import LoadingSmall from "../../../../components/Share/loadingSmall";

const Index = () => {
    const [data, setData] = useState({
        member: {},
        images: [],
        liked: false
    })
    const filter = useSelector(state => state.filter);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [filter])

    const like = async () => {
        let formData = {
            memberId: data.member._id
        }
        await likeMember(formData).then(res => {
            getData();
        })
    }

    const skip = async () => {
        await getData(data.member._id);
    }

    const getData = async () => {
        setLoading(true);
        await encounter([data.member._id]).then(res => {
            console.log(res.data)
            setData({member: res.data.member, images: res.data.images, liked: res.data.liked});
            setTimeout(() => {
                setLoading(false)
            }, 500)
        })
    }

    return (
        <div className="encouter-page">
            <div className="card photo">
                {
                    loading
                        ?
                        <LoadingSmall loading={loading} style={{borderRadius: '.75rem'}}/>
                        :
                        <div className="row">
                            <Image images={data.images} avatar={data.member?.avatar}/>
                            <Info member={data.member}/>
                        </div>
                }
            </div>

            <Action like={() => like} skip={() => skip} liked={data.liked} loading={loading}/>
        </div>
    );
};

export default Index;
