"use client"
import next from 'next'
import { useEffect, useState } from "react";
import Link from "next/link";


interface User {
    name: string
    id: string
    createdAt: string
    updatedAt: string
}
interface UserResponse {
    data: User[]
}

export default function HomePage() {
  const [rows, setRows] = useState<User[]>([])
  const fetchRows = async () =>{
    const res = await fetch("/slack")
    const {data}:UserResponse = await res.json()  // eslint-disable-line
    setRows(data)
  }
//   console.log(rows)
  useEffect(()=>{
    fetchRows() // eslint-disable-line
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          List of <span className="text-[hsl(280,100%,70%)]">Slack</span> Members
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div className="relative overflow-x-auto flex flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
                <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Added
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row)=>{
                            return (
                                <tr key={row.id}className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {row.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {row.id}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.createdAt}
                                    </td>
                                    <td className="px-6 py-4">
                                        {row.updatedAt}
                                    </td>
                                </tr>
                            )

                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
                <Link href={'https://slack.com'}><h3 className="text-2xl font-bold">Slack Workspace →</h3></Link>
                <div className="text-lg">
                    Here is a table of users from the slack workspace MANDREL SUBMISSION
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}
