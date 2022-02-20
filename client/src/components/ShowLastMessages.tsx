import useSWR from 'swr';

const fetcher = (url: any) => fetch(url).then(res => res.json())

const ShowLastMessages: React.FC = () => {
  const { data, error } = useSWR('/api/messages', fetcher)
  console.log(data)
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
    </div>
  )
}

export default ShowLastMessages;
