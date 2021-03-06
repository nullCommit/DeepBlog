import Head from 'next/head';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const formattedPosts = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: format(
        new Date(post.first_publication_date),
        'dd MMM yyyy',
        {
          locale: ptBR,
        }
      ),
    };
  });

  const [posts, setPosts] = useState<Post[]>(formattedPosts);
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [currentPage, setCurrentPage] = useState(1);

  async function handleNextPage() {
    if (currentPage !== 1 && currentPage === null) {
      return;
    } else {
      const newNextPage = await fetch(`${nextPage}`).then(response =>
        response.json()
      );
      setNextPage(newNextPage.nextPage);
      setCurrentPage(newNextPage.page);

      const newPosts = newNextPage.results.map(post => {
        return {
          uid: post.uid,
          first_publication_date: format(
            new Date(post.first_publication_date),
            'dd MMM yyyy',
            {
              locale: ptBR,
            }
          ),
          data: {
            title: post.data.title,
            subtitle: post.data.subtitle,
            author: post.data.author,
          },
        };
      });

      setPosts([...posts, ...newPosts]);
    }
  }

  return (
    <>
      <Head>
        <title>Home | Space Traveling</title>
      </Head>

      <main className={styles.container}>
        {posts.map(post => (
          <Link key={post.uid} href={`/post/${post.uid}`}>
            <a className={styles.content}>
              <h1>{post.data.title}</h1>

              <p>{post.data.subtitle}</p>

              <ul>
                <li>
                  <FiCalendar size="20px" color="#bbbbbb" />
                  {post.first_publication_date}
                </li>

                <li>
                  <FiUser size="20px" color="#bbbbbb" />
                  {post.data.author}
                </li>
              </ul>
            </a>
          </Link>
        ))}

        {nextPage && (
          <button className={styles.button} onClick={handleNextPage}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const prismic = getPrismicClient();

  const postsResponse = await prismic.query<any>(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.subtitle', 'post.author'],
      pageSize: 2,
    }
  );

  // console.log(JSON.stringify(postsResponse, null, 2));

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      // first_publication_date: new Date(
      //   post.first_publication_date
      // ).toLocaleDateString('pt-BR', {
      //   day: '2-digit',
      //   month: 'short',
      //   year: 'numeric',
      // }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results,
  };

  // console.log(JSON.stringify(postsPagination, null, 2));

  return {
    props: {
      postsPagination,
    },
  };
};
