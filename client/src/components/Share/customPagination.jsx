import React, {useEffect} from 'react';
import {Pagination} from "react-bootstrap";

const CustomPagination = (props) => {
    const {pagination, onPageChange} = props;
    const {page, limit, totalRows} = pagination;
    const lastPage = Math.ceil(totalRows/limit);

    const handleChange = (newPage) => {
        onPageChange(newPage)
    }

    const pageNumbers = () => {
        const list = [];
        for (let i = 1; i <= lastPage; i++) {
            list.push(i)
        }
        return list;
    }

    return (
        <Pagination className={'justify-content-center'}>
            <Pagination.First onClick={() => handleChange(1)}/>
            <Pagination.Prev disabled={page <= 1} onClick={() => handleChange(page - 1)}/>
            {
                pageNumbers().map(number => (
                    <Pagination.Item key={number} onClick={() => handleChange(number)}>{number}</Pagination.Item>
                ))
            }
            <Pagination.Next disabled={page === lastPage} onClick={() => handleChange(page + 1)} />
            <Pagination.Last onClick={() => handleChange(lastPage)}/>
        </Pagination>
    );
};

export default CustomPagination;