import { Exclude } from 'class-transformer';
import { Artist } from 'src/artists/entities/artist.entity';
import { PlayList } from 'src/playlists/entities/playlist.entity';

import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToOne(() => Artist, (artist) => artist.user)
  artist: Artist;

  @OneToMany(() => PlayList, (playlist) => playlist.user)
  playlists: PlayList[];
}
