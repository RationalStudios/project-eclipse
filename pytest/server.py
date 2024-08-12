from socket import socket
from zlib import decompress

import pygame

WIDTH = 1900
HEIGHT = 1000


def recvall(conn, length):
    """ Retreive all pixels. """

    buf = b''
    while len(buf) < length:
        data = conn.recv(length - len(buf))
        if not data:
            return data
        buf += data
    return buf


def main(host='0.0.0.0', port=5000):
    watching = True    

    
    sock = socket()
    sock.bind((host, port))

    sock.listen(5)
    while watching:
        try:
            
            conn, addr = sock.accept()
            
            pygame.init()
            screen = pygame.display.set_mode((WIDTH, HEIGHT),pygame.FULLSCREEN)
            clock = pygame.time.Clock()

            while watching:
                for event in pygame.event.get():
                    if event.type == pygame.QUIT:
                        watching = False
                        break

                # Retreive the size of the pixels length, the pixels length and pixels
                size_len = int.from_bytes(conn.recv(1), byteorder='big')
                size = int.from_bytes(conn.recv(size_len), byteorder='big')
                pixels = decompress(recvall(conn, size))

                # Create the Surface from raw pixels
                img = pygame.image.fromstring(pixels, (WIDTH, HEIGHT), 'RGB')

                # Display the picture
                screen.blit(img, (0, 0))
                pygame.display.flip()
                clock.tick(120)
        finally:
            conn.close()


if __name__ == '__main__':
    main()