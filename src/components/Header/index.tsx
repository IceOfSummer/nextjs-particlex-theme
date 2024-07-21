'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faIdCard, faBoxArchive, faBookmark, faTags  } from '@fortawesome/free-solid-svg-icons'
import styles from './header.module.scss'

interface HeaderProps {
  /**
   * 当滑动到顶部时，自动透明. 默认 false
   */
  autoTransparentOnTop?: boolean
  /**
   * 博客标题
   */
  title: string
}


const Index:React.FC<HeaderProps> = props => {
  const [headerClass, setHeaderClass] = useState(props.autoTransparentOnTop ? styles.headerTransparentVisible : styles.headerVisible)
  useEffect(() => {
    const wheelListener = (ev: WheelEvent) => {
      if (ev.deltaY < 0) {
        if (document.documentElement.scrollTop <= window.innerHeight && props.autoTransparentOnTop) {
          setHeaderClass(styles.headerTransparentVisible)
        } else {
          setHeaderClass(styles.headerVisible)
        }
      } else {
        setHeaderClass(styles.headerHide)
      }
    }
    addEventListener('wheel', wheelListener)
    return () => {
      removeEventListener('wheel', wheelListener)
    }
  }, [props.autoTransparentOnTop])

  return (
    <div className={`font-bold text-sm pl-16 text-zinc-600 flex-row flex ${styles.header} ${headerClass}`}>
      <Link href="/public" className="pl-10">
        { props.title }
      </Link>
      <div className="flex">
        <Link href="/public" className="flex pl-10 items-center">
          <FontAwesomeIcon icon={faHouse} width="1rem" />
          <span className="pl-2">Home</span>
        </Link>
        <Link href="/about" className="flex pl-10 items-center">
          <FontAwesomeIcon icon={faIdCard} width="1.1rem" />
          <span className="pl-2">About</span>
        </Link>
        <Link href="/archives" className="flex pl-10 items-center">
          <FontAwesomeIcon icon={faBoxArchive} width="1rem" />
          <span className="pl-2">Archives</span>
        </Link>
        <Link href="/categories" className="flex pl-10 items-center">
          <FontAwesomeIcon icon={faBookmark} width="0.7rem" />
          <span className="pl-2">Categories</span>
        </Link>
        <Link href="/categories" className="flex pl-10 items-center">
          <FontAwesomeIcon icon={faTags} width="0.9rem" />
          <span className="pl-2">Tags</span>
        </Link>
      </div>
    </div>
  )
}

export default Index