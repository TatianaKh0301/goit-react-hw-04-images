import React, {useEffect, useState} from "react";
import { ToastContainer} from 'react-toastify';
import SearchBar from "components/SearchBar/SearchBar";
import { Loader } from "components/Loader";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button";
import { AppWrapper, ErrorWrapper, MessageEndGallery } from "./App.styled";


const APIkey = '30028288-057bf7cd6d2ddc6419712f1dc';
const perPage = 12;

export default function App() {
    const [imagesTitle, setImageTitle] = useState('');
    const [hits, setHits] = useState(null);
    const [isLoader, setIsLoader]= useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [moreImages, setMoreImages] = useState(false); 

    useEffect(() => {
        const controller = new AbortController();
        if(imagesTitle === '') {return};

        if(page === 1) {
            setIsLoader(true);
            setHits(null);
        }

        const fetchData = () => {
            const requestValue = imagesTitle;
            fetch(`https://pixabay.com/api/?q=${requestValue}&page=${page}&key=${APIkey}&image_type=photo&orientation=horizontal&per_page=${perPage}`,
                {
                    signal: controller.signal
                }
            )
                    .then(response => response.json())       
                    .then(data => {
                        console.log("data", data);
                        
                        if (data.hits.length === 0) { 
                            return Promise.reject(new Error(`There are no images "${ requestValue }"`)) 
                        }

                        setHits((prevState) => {
                            if(prevState === null) {return data.hits}
                            return [...prevState, ...data.hits];
                        } );

                        setMoreImages((Math.ceil(data.totalHits / perPage)) > page);
                    }) 
                    .catch(error => setError(error ))
                    .finally (() => setIsLoader(false));
        };
        
        fetchData();

        return () => {
            controller.abort();
        };

    }, [imagesTitle, page]);

    const handleFormSubmit = imagesTitle => {
        setImageTitle(imagesTitle);
        setError(null);
        setPage(1);
    };

    const handleButtonLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <AppWrapper>        
            <SearchBar onSubmit={handleFormSubmit}/>
            {error && <ErrorWrapper>{error.message}</ErrorWrapper>}       
            {isLoader && <Loader />}
            {hits &&
                <>
                    <ImageGallery imagesFind={hits} />                     
                    {moreImages ? <Button onSubmitLoadMore={handleButtonLoadMore}/> : <MessageEndGallery>There are no more images</MessageEndGallery>}
                </>             
            }   
            <ToastContainer/>
        </AppWrapper>
    );    
};