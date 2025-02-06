import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';

function App() {
  return (
    <main className='relative'>
      <Header />
      <section className='w-full px-6 xl:px-0 absolute top-50 flex flex-col items-center'>
        <SearchForm />
      </section>

    </main>
  )
}

export default App
