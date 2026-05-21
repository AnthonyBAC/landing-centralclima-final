'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Drawer, Skeleton, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Empresa', href: '/empresa' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Clientes', href: '/clientes' },
  { label: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const showDrawer = () => {
    setOpen(true);
    setTimeout(() => setLoaded(true), 600);
  };


  const closeDrawer = () => {
    setOpen(false);
    setLoaded(false);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image src="/logo.svg" alt="CentralClima" width={180} height={40} priority />
      </Link>

      <div className={styles.links}>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </div>

      
      <Link href="/cotizar" className={styles.cta}>
        Cotizar <span>→</span>
      </Link>

      <Button
        type="text"
        icon={<MenuOutlined style={{ fontSize: 22 }} />}
        onClick={showDrawer}
        className={styles.hamburger}
        aria-label="Abrir menú"
      />

      <Drawer
        title={<span className={styles.drawerTitle}>CentralClima</span>}
        placement="right"
        onClose={closeDrawer}
        open={open}
        width={280}
        styles={{ body: { padding: 24 } }}
      >
        {loaded ? (
          <div className={styles.drawerLinks}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeDrawer} className={styles.drawerLink}>
                {link.label}
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.drawerSkeleton}>
            {navLinks.map((_, i) => (
              <Skeleton.Button
                key={i}
                active
                size="large"
                block
                style={{ height: 40, marginBottom: 16 }}
              />
            ))}
          </div>
        )}
      </Drawer>
    </nav>
  );
}
