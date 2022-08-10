CREATE TABLE  public.userData (
	"_id" serial NOT NULL,
	"site_name" varchar NOT NULL,
	"site_id" integer NOT NULL,
	"visit_date" DATE NOT NULL,
	"comment" varchar NOT NULL,
	"username" varchar NOT NULL,
	CONSTRAINT "userData_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.userAccounts (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"email" varchar NOT NULL,
	CONSTRAINT "userAccounts_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
)