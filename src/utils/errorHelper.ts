import { AxiosError } from 'axios';
import { get } from 'lodash';
import i18next from './i18n'
import { createElement, ReactNode } from 'react';

export const getReadableError = (error: any) : string | ReactNode  => {

    let axiosError = error as AxiosError
    if(axiosError) {
        // check sever errors
        let responseError = get(axiosError,['response', 'data', 'errors']) as string[]
        if(responseError != undefined && responseError.length > 0){
            if(responseError.length > 1) {
                var list:ReactNode[] = [];
                responseError.forEach((value)=> {
                    var item = createElement('li',{}, value);
                    list.push(item);
                })
                return createElement('div',{},list);
            } 
            return responseError[0]
        }
    }
    return  i18next.t('went_wrong').toString()
};