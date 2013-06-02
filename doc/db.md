# Database Organization

## About

Here I'll write down some thoughts on the database organization. I hope it's
fairly self-explanatory, though I'll try to elaborate on the "schema" syntax
eventually (I'm creating it as I go!)

## Schema Outline

    newtype keys<T> = set<string>

### Users, Registration, and Sessions

    type    uid     = id<user>
    type    active  = bool
    type    dob     = date
    newtype nick    = string
    newtype salt    = string
    newtype hash    = string
    newtype email   = string
    newtype verif   = string
    newtype session = string

    user:(uid)                   :: hash<active, nick, salt, hash, email, dob>
    user@nick:(nick)             :: uid
    user:(uid):verif             :: verif
    user:(uid):mailbox           :: messages
    user:(uid):mailbox:blacklist :: set<uid>
    sessions:(session)           :: uid

`user`s must be searchable by nickname so that login can function efficiently.
Only active users have an entry in `@nick`; inactive cannot become active if a
competing entry exists.

When a new `user` is registered, `.active` is `false`, and `:verif` is a
randomly-generated string sent to the `.email`. Until verified, any keys
relating to that `user` have expirations.

`user`s can be sent messages, so a `:messages` sub-key is required. But a `user`
may wish to prevent certain others from sending messages, so a `:blacklist` is
needed, too.

`session`s are computed using something like `session = h(hash + now)`, where
`h` is a hash function. They'll expire at a user-specified or some default
interval.

#### Admin

Like in UNIX, the `user` with id 0 will be treated as the administrator. All
authorizations are bypassed when a command originates from this `user`. Because
INCR begins at 1, it's impossible for a client to acquire this id.

#### Other User Data

What about other info, such as UI configuration/preferences? Store those on the
client instead! If `user`s want to persist their settings between devices,
perhaps add an export/import function to the client.

### Messages, Threads & Boards

    type mid       = id<message>
    type owner     = mid
    type messages  = sset<mid | message:{mid}.timestamp>
    type sender    = mid
    type timestamp = date
    type subject   = string
    type body      = string

    message:(mid)      :: hash<sender, timestamp, subject, body>
    message:(mid):sent :: keys<messages>

Each `message` has only one `sender`, but may be delivered to multiple
`messages` containers upon submission, so `:sent` is needed to track those. This
allows `user`s effectively to "unsend" a `messages` to any recipients. It's
important to note that a `message` can be sent both to `mailbox`es and to
`thread`s.

    type tid     = id<thread>
    type bid     = id<board>

    thread:(tid)        :: messages
    thread:(tid):board  :: bid
    thread:(tid):locked :: bool
    board:(bid)         :: hash<name :: string, desc :: string>
    board:(bid):threads :: sset<tid | thread:{tid}[-1].timestamp>
    boards              :: list<bid>

A `thread`, like a `mailbox`, is a sorted set of `message`s. When a `message` is
posted to a `thread`, update score in its `board`'s `:threads` sub-key.
