import { useCallback } from 'react';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { IoSearchOutline } from 'react-icons/io5';

import usePostSearch from '../../hooks/usePostSearch';
import BlogPosts from '../blog/BlogPosts';
import Divider from '../shared/Divider';

const Search = () => {
    const { doSearch, isIndexing, results } = usePostSearch();

    let [isOpen, setIsOpen] = useState(false);

    const closeModal = useCallback(() => {
        doSearch('');
        setIsOpen(false);
    }, [doSearch]);

    const openModal = useCallback(() => {
        if (isIndexing) {
            return alert('Search is loading index, pls try again later.');
            //* We should show some alert here
        }
        setIsOpen(true);
    }, [isIndexing]);

    const handleSearch = useCallback(
        (e) => {
            const query = e.target.value;
            doSearch(query);
        },
        [doSearch],
    );

    return (
        <>
            <div className="inline cursor-pointer" onClick={openModal}>
                <IoSearchOutline className="outline-icon" size="1.5em" />
            </div>
            <Dialog
                as="div"
                className="has-dark-mode relative z-10"
                onClose={closeModal}
                open={isOpen}
            >
                <div className="fixed inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-10" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex justify-center p-4 pt-12">
                        <Dialog.Panel className="w-full p-4 rounded-md bg-white shadow-gray-600 shadow-xl dark:shadow-none dark:bg-gray-800 max-w-xl transform overflow-hidden transition-all">
                            <div className="py-2 w-full flex justify-start">
                                <input
                                    className="bg-transparent w-full focus:outline-none"
                                    disabled={isIndexing}
                                    placeholder="Type something to search"
                                    onChange={handleSearch}
                                />
                            </div>
                            <Divider caption="Results" />
                            <div>
                                <BlogPosts posts={results} />
                            </div>
                            <div className="flex justify-end">
                                <span className="text-xs text-slate-500">
                                    Click
                                    <a
                                        className="cursor-pointer"
                                        onClick={closeModal}
                                    >
                                        {' '}
                                        here{' '}
                                    </a>
                                    or press "esc" to close
                                </span>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default Search;
