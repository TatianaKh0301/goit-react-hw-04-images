import { useState } from "react";
import PropTypes from 'prop-types';
import {BsSearch} from "react-icons/bs";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarHeader, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "./SearchBar.styled";

export default function SearchBar({onSubmit}) {
    const [imagesTitle, setImagesTitle] = useState('');

    const handleTitleChange = event => {
        setImagesTitle(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = event => {
        event.preventDefault();
        
        if(imagesTitle.trim() ==='') {
            toast.error('Please, write a value!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                return;
        }

        onSubmit(imagesTitle);
        setImagesTitle('');
    };

    
        return(
            <SearchbarHeader>                
                <SearchForm onSubmit={handleSubmit}>
                    < SearchFormButton type="submit">
                        <BsSearch size="25"/>
                        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                    </ SearchFormButton>
    
                    <SearchFormInput
                        type="text"
                        autocomplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={imagesTitle}
                        onChange={handleTitleChange}
                    />
                </SearchForm>
            </SearchbarHeader>);
    }  


SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};