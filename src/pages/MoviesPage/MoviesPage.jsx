import { useSearchParams } from 'react-router-dom';
import MoviesList from '../../components/MoviesList/MoviesList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { getMoviesSearch } from "../../movies-api";
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


export default function MoviesPage ()  {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    const searchData = async (query, page) => {
      try {
        setLoading(true);

        const response = await getMoviesSearch(query, page);
        setSearchResults(response.results);
        setTotalPages(response.total_pages);

        if (!response.total_results) {
          toast(
            'No movies on your request! Try another name.',
            {
              duration: 3000,
            }
          );
        } 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      searchData(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <main>
      <section >
        <SearchForm onSubmit={query => setSearchParams({ search: query })} />
        <Toaster
          position="top-center"
          reverseOrder={false}
         
        />
        {loading && <p>Loading data...</p>}
        {searchResults.length !== 0 && <MoviesList movies={searchResults} />}
        {searchResults.length !== 0 && (
          <div >
            <button
              
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

