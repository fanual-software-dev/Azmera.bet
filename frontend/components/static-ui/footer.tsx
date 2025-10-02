import React from 'react'

const Footer = () => {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-8 text-slate-400">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="text-base text-white font-semibold font-[Poppins]">Azmera Bet</h4>
            <p className="text-xs text-white font-[Poppins]">© {new Date().getFullYear()} Azmera Bet. All rights reserved.</p>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <a className="cursor-pointer font-[Poppins] text-xs text-white underline hover:text-sky-500">Terms</a>
              <a className="cursor-pointer font-[Poppins] text-xs text-white underline hover:text-sky-500">Privacy</a>
              <a className="cursor-pointer font-[Poppins] text-xs text-white underline hover:text-sky-500">Responsible Gaming</a>
            </div>

            <div className="flex flex-col gap-2">
              <a className="cursor-pointer text-xs font-[Poppins] text-white underline hover:text-sky-500">Support</a>
              <a className="cursor-pointer text-xs font-[Poppins] text-white underline hover:text-sky-500">Payments</a>
              <a className="cursor-pointer text-xs font-[Poppins] text-white underline hover:text-sky-500">Careers</a>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer
